import { Organization } from './data';

export interface GeocodedOrganization extends Organization {
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Default Cleveland area coordinates
export const CLEVELAND_CENTER = {
  lat: 41.4993,
  lng: -81.6944,
};

// Named locations in Cleveland area with known coordinates
export const CLEVELAND_NEIGHBORHOODS: Record<string, { lat: number, lng: number }> = {
  'Downtown': { lat: 41.4993, lng: -81.6944 },
  'University Circle': { lat: 41.5074, lng: -81.6083 },
  'Midtown': { lat: 41.5038, lng: -81.6541 },
  'Ohio City': { lat: 41.4872, lng: -81.7034 },
  'Tremont': { lat: 41.4709, lng: -81.6976 },
  'The Flats': { lat: 41.4967, lng: -81.7048 },
  'Playhouse Square': { lat: 41.5017, lng: -81.6808 },
  'Detroit Shoreway': { lat: 41.4760, lng: -81.7213 },
  'Shaker Heights': { lat: 41.4739, lng: -81.5370 },
  'Beachwood': { lat: 41.4645, lng: -81.5087 },
  'Independence': { lat: 41.3842, lng: -81.6365 },
  'Solon': { lat: 41.3897, lng: -81.4418 },
  'Strongsville': { lat: 41.3169, lng: -81.8363 },
  'Westlake': { lat: 41.4553, lng: -81.9179 },
  'Lakewood': { lat: 41.4824, lng: -81.7983 },
  'Akron': { lat: 41.0814, lng: -81.5190 },
  'Canton': { lat: 40.7989, lng: -81.3784 },
  'Euclid': { lat: 41.5931, lng: -81.5268 },
  'Mayfield Heights': { lat: 41.5195, lng: -81.4540 },
  'Mentor': { lat: 41.6661, lng: -81.3396 },
  'North Olmsted': { lat: 41.4155, lng: -81.9231 },
  'Parma': { lat: 41.4048, lng: -81.7229 },
  'Avon': { lat: 41.4517, lng: -82.0354 },
  'Avon Lake': { lat: 41.5053, lng: -82.0282 },
};

/**
 * Geocode an organization by its name and location, using OpenStreetMap Nominatim API
 */
export async function geocodeOrganization(org: Organization): Promise<GeocodedOrganization> {
  try {
    if (!org.name) {
      return { ...org };
    }
    
    // Prepare the search query with organization name and Cleveland as context
    const query = encodeURIComponent(`${org.name} Cleveland Ohio`);
    
    // Add a small delay to avoid rate limiting (Nominatim has a 1 request per second policy)
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Make the API request to OSM Nominatim
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'ClevelandTechDashboard/1.0'
        }
      }
    );
    
    if (!response.ok) {
      console.error(`Geocoding failed for ${org.name}: ${response.statusText}`);
      return { ...org };
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        ...org,
        coordinates: {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }
      };
    }
    
    // If no result, return the original organization
    return { ...org };
  } catch (error) {
    console.error(`Error geocoding ${org.name}:`, error);
    return { ...org };
  }
}

/**
 * Batch geocode multiple organizations with rate limiting
 */
export async function batchGeocodeOrganizations(
  organizations: Organization[],
  limit: number = 5 // Limit to avoid too many API requests
): Promise<GeocodedOrganization[]> {
  // Prioritize orgs with better data for geocoding (e.g., those with industry info)
  const prioritizedOrgs = [...organizations]
    .sort((a, b) => (a.industry && !b.industry ? -1 : (!a.industry && b.industry ? 1 : 0)));
  
  const orgsToGeocode = prioritizedOrgs.slice(0, limit);
  const restOrgs = prioritizedOrgs.slice(limit);
  
  console.log(`Geocoding ${orgsToGeocode.length} organizations...`);
  
  // Process organizations sequentially with proper rate limiting
  const geocodedOrgs: GeocodedOrganization[] = [];
  
  for (const org of orgsToGeocode) {
    console.log(`Geocoding: ${org.name}`);
    const geocodedOrg = await geocodeOrganization(org);
    geocodedOrgs.push(geocodedOrg);
  }
  
  // For the rest, assign random locations from Cleveland neighborhoods
  const randomizedOrgs = restOrgs.map(org => {
    const neighborhoods = Object.keys(CLEVELAND_NEIGHBORHOODS);
    const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const baseCoords = CLEVELAND_NEIGHBORHOODS[randomNeighborhood];
    
    // Add a small random offset to avoid overlaps
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;
    
    return {
      ...org,
      coordinates: {
        lat: baseCoords.lat + latOffset,
        lng: baseCoords.lng + lngOffset
      }
    };
  });
  
  return [...geocodedOrgs, ...randomizedOrgs];
} 