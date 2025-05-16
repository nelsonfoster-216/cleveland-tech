/**
 * Email scraper utility for extracting contact emails from company websites
 * 
 * This is provided as a reference implementation. In a production environment:
 * 1. Consider rate limiting to avoid overloading websites
 * 2. Add proper error handling for network issues
 * 3. Respect robots.txt and website terms of service
 * 4. Consider using a headless browser for JavaScript-rendered content
 */

export interface ScrapedEmail {
  email: string;
  source: string;
  page: string;
}

/**
 * Scrapes a website for email addresses
 * @param url The URL of the website to scrape
 * @param pagesLimit Maximum number of pages to scrape (defaults to 3)
 * @returns Array of found email addresses with sources
 */
export async function scrapeEmailsFromWebsite(url: string, pagesLimit: number = 3): Promise<ScrapedEmail[]> {
  const results: ScrapedEmail[] = [];
  const visitedUrls = new Set<string>();
  const baseUrl = new URL(url).origin;
  const urlsToVisit = [url];
  
  try {
    // Basic validation
    if (!url.startsWith('http')) {
      return results;
    }
    
    // Process urls until we reach the limit or run out of urls
    while (urlsToVisit.length > 0 && visitedUrls.size < pagesLimit) {
      const currentUrl = urlsToVisit.shift();
      if (!currentUrl || visitedUrls.has(currentUrl)) continue;
      
      visitedUrls.add(currentUrl);
      
      try {
        // Fetch the page content
        const response = await fetch(currentUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 Cleveland Tech Dashboard (Conference Outreach Tool)'
          }
        });
        
        if (!response.ok) continue;
        
        const html = await response.text();
        
        // Find emails using regex
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = html.match(emailRegex);
        
        if (matches) {
          // Filter out emails that are likely not relevant (e.g., example.com)
          const validEmails = matches.filter(email => 
            !email.includes('example.com') && 
            !email.includes('domain.com') &&
            !email.includes('yourdomain')
          );
          
          // Add unique emails to results
          validEmails.forEach(email => {
            if (!results.some(result => result.email === email)) {
              results.push({
                email,
                source: baseUrl,
                page: currentUrl
              });
            }
          });
        }
        
        // Find potential contact/about pages to visit next
        if (visitedUrls.size < pagesLimit) {
          const contactPageRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>.*?(contact|about|team|connect|get in touch|reach us|support).*?<\/a>/gi;
          let contactMatch;
          
          while ((contactMatch = contactPageRegex.exec(html)) !== null) {
            let contactUrl = contactMatch[1];
            
            // Handle relative URLs
            if (contactUrl.startsWith('/')) {
              contactUrl = baseUrl + contactUrl;
            } else if (!contactUrl.startsWith('http')) {
              contactUrl = new URL(contactUrl, currentUrl).href;
            }
            
            // Only add URLs from the same domain
            if (contactUrl.startsWith(baseUrl) && !visitedUrls.has(contactUrl) && !urlsToVisit.includes(contactUrl)) {
              urlsToVisit.push(contactUrl);
            }
          }
        }
      } catch (error) {
        console.error(`Error scraping ${currentUrl}:`, error);
        // Continue with next URL
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error during email scraping:', error);
    return results;
  }
}

/**
 * Formats an email address into a better display format
 * Example: info@company.com -> Info at Company
 */
export function formatEmailForDisplay(email: string): string {
  try {
    const [username, domain] = email.split('@');
    const domainName = domain.split('.')[0];
    
    const formattedUsername = username
      .split(/[.-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const formattedDomain = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    
    return `${formattedUsername} at ${formattedDomain}`;
  } catch (e) {
    return email;
  }
} 