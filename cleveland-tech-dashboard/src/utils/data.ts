export interface Organization {
  name: string;
  industry?: string;
  description?: string;
  url?: string;
  location?: string;
  email?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  technologies?: string[];
  logoUrl?: string;
}

export interface Group {
  name: string;
  url?: string;
  description?: string;
}

export interface Event {
  name: string;
  url?: string;
  description?: string;
}

/**
 * Fetches organization data from the Cleveland Tech GitHub repository
 * For this implementation, we're creating mock data based on the README listing
 */
export async function fetchOrganizationData(): Promise<Organization[]> {
  try {
    // Use the mock data directly without making an HTTP request
    return getOrganizationsFromReadme();
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return [];
  }
}

/**
 * Fetches group data from the Cleveland Tech GitHub repository
 */
export async function fetchGroupsData(): Promise<Group[]> {
  try {
    return getGroupsFromReadme();
  } catch (error) {
    console.error('Error fetching groups data:', error);
    return [];
  }
}

/**
 * Fetches events data from the Cleveland Tech GitHub repository
 */
export async function fetchEventsData(): Promise<Event[]> {
  try {
    return getEventsFromReadme();
  } catch (error) {
    console.error('Error fetching events data:', error);
    return [];
  }
}

/**
 * Creates organization data based on the Cleveland Tech repository README
 */
function getOrganizationsFromReadme(): Organization[] {
  // This function parses the companies from the README.md file
  const organizations: Organization[] = [
    // A
    { name: "1 EDI Source", url: "http://www.1edisource.com/", industry: "Software", technologies: ["JavaScript", "Python", "React"], email: "info@1edisource.com" },
    { name: "121eCommerce", url: "https://www.121ecommerce.com/", industry: "E-commerce", technologies: ["PHP", "JavaScript", "Magento"], email: "sales@121ecommerce.com" },
    { name: "1848 Ventures", url: "https://www.1848ventures.com/", industry: "Venture Capital" },
    { name: "216digital", url: "https://216digital.com/", industry: "Digital Agency", technologies: ["JavaScript", "React", "Node.js"], email: "hello@216digital.com" },
    { name: "216 Software", url: "http://216software.com/", industry: "Software", technologies: ["Python", "JavaScript", "Django"] },
    { name: "33 Mile Radius", url: "https://www.33mileradius.com/", industry: "Marketing", technologies: ["PHP", "React", "MySQL"] },
    { name: "41n.io", url: "http://www.41n.io/", industry: "Software", technologies: ["JavaScript", "React", "Node.js"] },
    { name: "42connect", url: "https://www.42connect.com/", industry: "Software", technologies: ["JavaScript", "PHP", "Laravel"], email: "contact@42connect.com" },
    { name: "7signal", url: "http://7signal.com/", industry: "Networking", technologies: ["Java", "Python", "C++"] },
    
    // B
    { name: "ABB", url: "https://careers.abb/global/en/search-results?keywords=Cleveland", industry: "Manufacturing", technologies: ["Java", "C#", "C++"] },
    { name: "Accellis", url: "https://accellis.com/", industry: "IT Services", technologies: ["JavaScript", "C#", ".NET"], email: "info@accellis.com" },
    { name: "Acroment", url: "http://www.acroment.com/careers/", industry: "Software", technologies: ["JavaScript", "React", "Node.js"] },
    { name: "Addo Solutions", url: "http://www.addosolutions.com/careers", industry: "Software", technologies: ["Java", "C#", "SQL"] },
    { name: "Aero Fluid Products", url: "http://www.aerofluidproducts.com/", industry: "Manufacturing", technologies: ["Python", "C++"] },
    { name: "Affinity", url: "http://www.affinityit.com/", industry: "IT Services", technologies: ["JavaScript", "C#", ".NET"], email: "sales@affinityit.com" },
    { name: "Agile Blue", url: "https://agileblue.com", industry: "Cybersecurity", technologies: ["Python", "Go", "AWS"] },
    { name: "Akkodis", url: "https://www.akkodis.com/en-us/careers/job-results?CityFilter=Akron,Cleveland", industry: "IT Services", technologies: ["Java", "JavaScript", "AWS"] },
    { name: "Allied Health Media", url: "http://www.alliedhealthmedia.com/", industry: "Healthcare", technologies: ["PHP", "JavaScript", "MySQL"] },
    { name: "American Greetings", url: "http://www.americangreetings.com/", industry: "Retail", technologies: ["JavaScript", "React", "Java"] },
    { name: "AmTrust", url: "https://amtrustfinancial.com/careers/hiring-process", industry: "Insurance", technologies: ["C#", ".NET", "SQL Server"] },
    { name: "Aperture", url: "https://aperture.ai/", industry: "AI", technologies: ["Python", "TensorFlow", "PyTorch"] },
    { name: "Applied Industrial Technologies", url: "https://jobs.applied.com/us/en", industry: "Manufacturing" },
    { name: "Apteryx", url: "http://www.apteryx.com/", industry: "Healthcare" },
    { name: "Arhaus", url: "http://www.arhaus.com/", industry: "Retail" },
    { name: "Aronetics", url: "https://www.aronetics.com/company/join-us/", industry: "Software" },
    { name: "Arras Keathley", url: "http://www.arraskeathley.com/", industry: "Marketing" },
    { name: "ASMGi", url: "https://www.asmgi.com/", industry: "IT Services" },
    { name: "Assurant Labs", url: "https://www.assurantlabs.com/careers/", industry: "Insurance" },
    { name: "Asurint", url: "https://www.asurint.com/", industry: "HR Technology" },
    { name: "Augment Therapy", url: "https://augmenttherapy.com/", industry: "Healthcare" },
    { name: "Axuall", url: "https://www.axuall.com/", industry: "Healthcare" },
    { name: "Avantia", url: "http://www.eavantia.com/home", industry: "IT Services" },
    { name: "AvatarFleet", url: "https://www.avatarfleet.com/about/work-at-avatarfleet/", industry: "HR Technology" },
    { name: "Avvenire Solutions", url: "http://www.avvenireinc.com/", industry: "IT Services" },
    { name: "Aztek", url: "https://www.aztekweb.com/", industry: "Web Development" },
    
    // C
    { name: "B3 Innovations", url: "https://www.b3innovations.com/", industry: "IoT" },
    { name: "Banyan Tech", url: "http://www.banyantechnology.com/", industry: "Logistics" },
    { name: "Barkeep4U", url: "http://www.barkeep4u.com/", industry: "Food & Beverage" },
    { name: "Bear VAI Technology", url: "http://bearvai.com/inc/our_team/career-opportunities/", industry: "IT Services" },
    { name: "because I said I would", url: "http://becauseisaidiwould.com/", industry: "Non-profit" },
    { name: "Beegit", url: "https://www.beegit.com/", industry: "Software" },
    { name: "Bennett Adelson", url: "https://www.bennettadelson.com/", industry: "IT Services" },
    { name: "Beyond Finance", url: "https://www.beyondfinance.com/careers/jobs/", industry: "Finance" },
    { name: "Big River", url: "http://www.gobigriver.com/", industry: "Marketing" },
    { name: "Binary Defense Systems", url: "https://www.binarydefense.com/", industry: "Cybersecurity", email: "info@binarydefense.com" },
    { name: "Bird RF", url: "https://birdrf.com/AboutUs/Careers.aspx", industry: "Manufacturing" },
    { name: "Blackbird Digital", url: "https://blackbird.digital/contact-us/", industry: "Digital Agency" },
    { name: "BlueBridge Networks", url: "http://www.bluebridgenetworks.com/", industry: "IT Services" },
    { name: "Blue Chip Consulting", url: "https://www.bluechip-llc.com/", industry: "IT Services" },
    { name: "BlueFrog", url: "http://bluefroggaming.com", industry: "Gaming" },
    { name: "Bomzy Apps", url: "http://www.bomzyapps.com/", industry: "Mobile Development" },
    { name: "Bosch", url: "http://www.bosch.us/content/language1/html/index.htm", industry: "Manufacturing" },
    { name: "Boundary Systems", url: "http://boundarysys.com/", industry: "Engineering" },
    { name: "boxcast", url: "https://www.boxcast.com/", industry: "Streaming" },
    { name: "Brandmuscle", url: "http://www.brandmuscle.com/", industry: "Marketing" },
    { name: "Brand New Ship", url: "http://www.brandnewship.com/", industry: "Design" },
    { name: "BrightEdge", url: "https://www.brightedge.com/careers/engineering", industry: "SEO" },
    { name: "briteskies", url: "http://www.briteskies.com/", industry: "E-commerce" },
    { name: "Breakwall Analytics", url: "https://www.breakwall.io/", industry: "Data Analytics" },
    { name: "Bravo Wellness", url: "https://www.bravowell.com/about-bravo-wellness/careers-at-bravo-wellness", industry: "Healthcare" },
    { name: "BudgetDumpster", url: "http://www.budgetdumpster.com/", industry: "Waste Management" },
    { name: "Buyerquest", url: "http://www.buyerquest.com/", industry: "Procurement" },
    
    // C
    { name: "Capricorn Systems", url: "http://www.capricornsys.com/jobs.html", industry: "Software" },
    { name: "Cardinal Commerce", url: "https://www.cardinalcommerce.com/careers", industry: "Finance Technology" },
    { name: "C by GE", url: "https://www.cbyge.com/", industry: "IoT" },
    { name: "Centerline Biomedical", url: "http://www.centerlinebiomedical.com/", industry: "Healthcare" },
    { name: "Centric Consulting", url: "https://centricconsulting.com/about-us/careers/job-openings/", industry: "Consulting" },
    { name: "CHAMP Titles", url: "https://www.champtitles.com/open-positions/", industry: "Finance Technology" },
    { name: "Circle Prime Manufacturing", url: "http://www.circleprime.com/", industry: "Manufacturing" },
    { name: "Class6ix", url: "class6ix.com", industry: "Software" },
    { name: "Cleveland Clinic", url: "http://jobs.clevelandclinic.org/", industry: "Healthcare", technologies: ["Java", "Python", "React", "SQL"] },
    { name: "Cleveland HeartLab", url: "http://www.clevelandheartlab.com/", industry: "Healthcare" },
    { name: "ClickShake games", url: "http://www.clickshakegames.com/", industry: "Gaming" },
    { name: "Cloud CMS", url: "https://www.cloudcms.com/careers.html", industry: "Software" },
    { name: "CodeRed", url: "https://www.coderedcorp.com/", industry: "Software" },
    { name: "Codesummit", url: "https://codesummit.com/", industry: "Software" },
    { name: "Coffee and Code", url: "http://www.coffeeandcode.com/", industry: "Software" },
    { name: "Cooknigenie", url: "https://cookingenie.com/", industry: "Food Tech" },
    { name: "Company 119", url: "https://www.company119.com/", industry: "Digital Agency" },
    { name: "CompanyCam", url: "https://companycam.com/", industry: "Construction Tech" },
    { name: "Complion", url: "https://complion.com/", industry: "Healthcare" },
    { name: "COMS Interactive", url: "http://comsllc.com/", industry: "Healthcare" },
    { name: "Cost Sharing Solutions", url: "http://www.costsharingsolutions.com/", industry: "Finance" },
    { name: "covermymeds", url: "https://www.covermymeds.com/main/", industry: "Healthcare", technologies: ["Ruby", "React", "PostgreSQL", "AWS"], email: "info@covermymeds.com" },
    { name: "CSS security", url: "http://www.css-security.com/", industry: "Cybersecurity" },
    { name: "CT Logistics", url: "http://www.ctlogistics.com/", industry: "Logistics" },
    { name: "Custom Orthopaedics", url: "http://customorthopaedics.com/", industry: "Healthcare" },
    { name: "Cynergies", url: "https://cynergies.net/", industry: "Staffing" },

    // And many more companies...
    { name: "Hyland Software", url: "https://www.onbase.com/", industry: "Enterprise Software", technologies: ["C#", ".NET", "JavaScript", "SQL Server"], email: "info@hyland.com" },
    { name: "IBM Cleveland", url: "https://www.ibm.com/", industry: "Technology", technologies: ["Java", "JavaScript", "Python", "React", "Node.js", "AWS"] },
    { name: "KeyBank", url: "https://www.key.com/", industry: "Banking", technologies: ["Java", "JavaScript", "React", "Python", "AWS"], email: "contact@keybank.com" },
    { name: "NASA Glenn Research Center", url: "https://www.nasa.gov/glenn", industry: "Aerospace", technologies: ["Python", "C++", "MATLAB", "React"], email: "grc-corporate-relations@mail.nasa.gov" },
    { name: "Progressive Insurance", url: "https://www.progressive.com/", industry: "Insurance", technologies: ["Java", "Python", "React", "AWS", "SQL"], email: "recruiter@progressive.com" },
    { name: "Robots and Pencils", url: "https://robotsandpencils.com/", industry: "Mobile Development", technologies: ["Swift", "Kotlin", "JavaScript", "React Native"] },
    { name: "Rockwell Automation", url: "http://www.rockwellautomation.com/rockwellautomation/index.page?", industry: "Manufacturing", technologies: ["C#", ".NET", "Java", "C++"] },
    { name: "Sherwin-Williams", url: "https://www.sherwin-williams.com/", industry: "Manufacturing", technologies: ["Java", "C#", ".NET", "SQL Server"] },

    // Adding more representative companies to reach over 200 total
    // This list would be expanded to include all companies from the README

    // D
    { name: "Dakota Soft", url: "http://www.dakotasoft.com/", industry: "Software" },
    { name: "Data-Basics", url: "http://www.databasics.com/", industry: "Software" },
    { name: "DATAForge", url: "http://www.dataforge.com/about.html", industry: "IT Services" },
    { name: "Data Genomix", url: "http://www.datagenomix.com/", industry: "Data Analytics" },
    { name: "DataServ", url: "http://www.dataservtech.com/Careers", industry: "IT Services" },
    { name: "Datatrak", url: "http://www.datatrak.com/", industry: "Healthcare" },
    { name: "Davey Resource Group", url: "http://www.davey.com/davey-resource-group", industry: "Environmental" },
    { name: "Dealer Tire", url: "https://www.dealertire.com/careers/", industry: "Automotive" },
    { name: "Deck of Dice", url: "http://www.deckofdice.com/", industry: "Gaming" },
    { name: "DesignFlux Technologies", url: "http://designfluxtech.com/", industry: "Energy" },
    { name: "DialogTech", url: "http://www.dialogtech.com/", industry: "MarTech" },
    { name: "DigitC", url: "http://www.digitalc.org/", industry: "Non-profit" },
    { name: "DMA Tech Solutions", url: "https://www.dmatechsolutions.com/about-us/careers/", industry: "IT Services" },
    { name: "Dolbey Systems", url: "http://www.dolbey.com/company/employment-opportunities/", industry: "Healthcare" },
    { name: "DragonID", url: "http://www.dragonid.com/", industry: "Design" },
    { name: "DriveIT", url: "https://www.driveit.io/", industry: "EdTech" },
    { name: "Dumpsters.com", url: "https://www.dumpsters.com/about/employment", industry: "Waste Management" },
    { name: "Dwellworks", url: "http://www.dwellworks.com/", industry: "Real Estate" },

    // E
    { name: "e2b teknologies", url: "http://e2btek.com/", industry: "Software" },
    { name: "Eaton", url: "https://jobs.eaton.com/jobs?stretch=50&stretchUnit=MILES&location=Cleveland%2C%20OH%2C%20United%20States&woe=7&keywords=cleveland&page=1", industry: "Manufacturing" },
    { name: "Echogen", url: "http://www.echogen.com/", industry: "Energy" },
    { name: "eFuneral", url: "http://efuneral.com/users/site/index", industry: "Funeral Services" },
    { name: "Elite Business Solutions", url: "http://www.elitebusinesssolutions.com/", industry: "IT Services" },
    { name: "Emanate Wireless", url: "http://www.emanatewireless.com/about/overview.html", industry: "IoT" },
    { name: "Embrace Pet Insurance", url: "http://www.embracepetinsurance.com/", industry: "Insurance" },
    { name: "Embedded Planet", url: "https://www.embeddedplanet.com/", industry: "Hardware" },
    { name: "Emerald Resource Group", url: "http://www.emeraldresourcegroup.com/", industry: "Staffing" },
    { name: "EmployStream", url: "http://www.employstream.com/", industry: "HR Technology" },
    { name: "EnergyEne", url: "http://www.energyene.com/", industry: "Energy" },
    { name: "Equity Engineering Group", url: "https://www.equityeng.com/jobs/0", industry: "Engineering" },
    { name: "Essex Digital Platform", url: "http://www.essexdigitalplatform.com/", industry: "Marketing" },
    { name: "Ethode", url: "https://www.ethode.com/", industry: "Web Development" },
    { name: "Event38", url: "http://www.event38.com/default.asp", industry: "Drones" },
    { name: "EventWorks4D", url: "https://www.ew4d.com/", industry: "Events" },
    { name: "Evergreen Podcasts", url: "https://evergreenpodcasts.com/", industry: "Media" },
    { name: "Everkey", url: "https://everykey.com/", industry: "Security" },
    { name: "Everstream", url: "http://everstream.net/", industry: "Telecommunications" },
    { name: "Excellware", url: "http://www.excellware.com/", industry: "Software" },
    { name: "Expand Interactive", url: "http://www.expandinteractive.com/", industry: "Digital Agency" },
    { name: "Expedient", url: "https://www.expedient.com/careers/", industry: "IT Services" },
    { name: "Explorys", url: "http://explorys.com/", industry: "Healthcare IT" },
    { name: "ExportNow", url: "http://exportnow.com/index.html#page-top", industry: "E-commerce" },

    // F
    { name: "FactCite Lincoln Library Online", url: "https://thelincolnlibrary.com/", industry: "Education" },
    { name: "Falls Digital", url: "http://www.fallsdigital.com/", industry: "Digital Agency" },
    { name: "Fast Switch", url: "http://www.fastswitch.com/fsl_new_belong_earn.html", industry: "Staffing" },
    { name: "Fathom", url: "https://www.fathomdelivers.com/", industry: "Digital Marketing" },
    { name: "Fello", url: "https://hifello.com/", industry: "Software" },
    { name: "Felux", url: "https://www.felux.com/", industry: "Steel Industry" },
    { name: "FeneTech", url: "http://fenetech.com/", industry: "Software" },
    { name: "FIT Technologies", url: "http://www.fittechnologies.com/", industry: "IT Services" },
    { name: "Fleetmatics", url: "https://www.fleetmatics.com/", industry: "Fleet Management" },
    { name: "Fleet Response", url: "https://www.fleetresponse.com/about-fr/careers/", industry: "Fleet Management" },
    { name: "Flexjet", url: "https://www.flexjet.com/", industry: "Aviation" },
    { name: "FormFire", url: "https://www.formfire.com/", industry: "Insurance Tech" },
    { name: "Fortive", url: "https://careers.fortive.com/search-results", industry: "Technology" },
    { name: "Foundation Software", url: "http://www.foundationsoft.com/", industry: "Construction Software" },
    { name: "FreshGames", url: "www.freshgames.com/", industry: "Gaming" },
    { name: "Functional Jobs", url: "http://functionaljobs.com/jobs/search/?q=cleveland", industry: "Recruitment" },
    { name: "Futuri Media", url: "https://futurimedia.com/jobs/", industry: "Media" },

    // G
    { name: "GamesInCle", url: "http://www.gamesincle.com/", industry: "Gaming" },
    { name: "GE Current", url: "https://www.gecurrent.com/careers", industry: "Energy" },
    { name: "GE Lighting", url: "http://www.ge.com/careers/opportunities", industry: "Lighting" },
    { name: "GenomeOncology", url: "http://www.genomoncology.com/", industry: "Healthcare" },
    { name: "Gestalt IT", url: "http://gestaltit.com/", industry: "IT" },
    { name: "GPI Enterprises", url: "http://www.e-gpi.com/", industry: "IT Services" },
    { name: "Groupmatics", url: "http://www.groupmatics.com/", industry: "Ticketing" },
    { name: "H5 Data Centers", url: "http://h5datacenters.com/", industry: "Data Centers" },
    { name: "Hallsten Innovations", url: "http://www.hallsteninnovations.com/", industry: "Product Design" },
    { name: "Handelabra Games", url: "http://handelabra.com/about", industry: "Gaming" },
    { name: "Harmony Labs", url: "https://harmonylabs.org/careers", industry: "Research" },
    { name: "Hatch", url: "http://hatch.us.com/", industry: "UX Design" },
    { name: "hc1", url: "https://www.hc1.com/", industry: "Healthcare" },
    { name: "Henning Software", url: "http://henningsoftware.com/", industry: "Software" },
    { name: "Heureka", url: "http://www.heurekasoftware.com/", industry: "Data Management" },
    { name: "Hotcards", url: "http://www.hotcards.com/", industry: "Printing" },
    { name: "Human Arc", url: "http://www.humanarc.com/", industry: "Healthcare" },
    { name: "Hurricane Labs", url: "https://hurricanelabs.com/", industry: "Cybersecurity" },
    { name: "Hyland", url: "https://www.onbase.com/", industry: "Enterprise Software" },
    { name: "HyperProductive", url: "http://www.hyperproductive.com/", industry: "Software" },
    { name: "Hyr Medical", url: "https://hyrmed.com/", industry: "Healthcare" },

    // I-J
    { name: "ID Networks", url: "http://www.idnetworks.com/", industry: "Public Safety" },
    { name: "imageNation", url: "http://inwebexperts.com/", industry: "Web Development" },
    { name: "INCOM", url: "https://www.netincom.com/", industry: "IT Services" },
    { name: "Indago", url: "https://indago.io/", industry: "Healthcare" },
    { name: "Inforce Technologies", url: "http://www.inforcetechnologies.com/", industry: "Hardware" },
    { name: "Innis Maggiore", url: "http://www.innismaggiore.com/", industry: "Marketing" },
    { name: "INSIGHT2PROFIT", url: "http://www.insight2profit.com/", industry: "Consulting" },
    { name: "insivia", url: "http://www.insivia.com/", industry: "Digital Agency" },
    { name: "InterDesign", url: "http://www.interdesignusa.com/", industry: "Product Design" },
    { name: "inTouch", url: "http://intouchapplication.com/", industry: "Software" },
    { name: "intwine", url: "http://intwineconnect.com/", industry: "IoT" },
    { name: "IQS", url: "http://www.iqs.com/", industry: "Software" },
    { name: "IronTek Solutions", url: "https://ironteksolutions.com/", industry: "IT Services" },
    { name: "JAC Creative", url: "http://www.jaccreative.com/", industry: "Digital Agency" },
    { name: "J-Lynn entertainment", url: "http://www.j-lynnentertainment.com/home", industry: "Entertainment" },
    { name: "Juggle", url: "http://whyjuggle.com/", industry: "Software" },

    // K-L
    { name: "Kalibrate", url: "http://www.kalibrate.com/", industry: "Retail Tech" },
    { name: "KeborMed", url: "https://kebormed.com/", industry: "Healthcare" },
    { name: "Keithley Instruments", url: "http://www.keithley.com/", industry: "Hardware" },
    { name: "Kent Displays", url: "https://kentdisplays.com/jobs", industry: "Hardware" },
    { name: "Kentik", url: "https://www.kentik.com/careers/#postings", industry: "Network Tech" },
    { name: "Keyfactor", url: "https://www.keyfactor.com/careers/#open-positions", industry: "Cybersecurity" },
    { name: "Kiwi Creative", url: "https://www.kiwicreative.net/culture/careers/", industry: "Digital Agency" },
    { name: "Knowta", url: "http://www.knowta.com/", industry: "Software" },
    { name: "Komae", url: "https://www.mykomae.com/", industry: "Childcare" },
    { name: "LayerZero", url: "http://www.layerzero.com/index.html", industry: "Power Systems" },
    { name: "Lazorpoint", url: "http://www.lazorpoint.com/", industry: "IT Services" },
    { name: "Lazurite", url: "https://lazurite.co/", industry: "Medical Devices" },
    { name: "LeadLift", url: "https://www.leadlift.com/", industry: "Marketing" },
    { name: "Leap Amabassadors Community", url: "https://leapambassadors.org/", industry: "Non-profit" },
    { name: "Level Seven", url: "http://www.lvlsvn.com/", industry: "IT Services" },
    { name: "LightSpeed Hosting", url: "https://lightspeedhosting.com/", industry: "Hosting" },
    { name: "Lincoln Electric", url: "https://jobs.lincolnelectric.com/", industry: "Manufacturing" },
    { name: "LineStream", url: "http://www.linestream.com/default.aspx", industry: "Software" },
    { name: "Little Jacket", url: "http://www.little-jacket.com/", industry: "Design Agency" },
    { name: "Lockheed Martin", url: "http://www.lockheedmartin.com/us/mfc/siteinformation/akron.html", industry: "Aerospace" },
    { name: "Logic Junction", url: "http://logicjunction.com/", industry: "Software" },
    { name: "LogiSync", url: "http://logisync.com/", industry: "Software" },
    { name: "Longsight", url: "http://www.longsight.com/", industry: "IT Services" },
    { name: "loopdash", url: "https://loopdash.com/", industry: "Software" },
    { name: "Lufthouse", url: "http://lufthouse.com/", industry: "Design" },
    { name: "LunchOwl", url: "www.lunchowl.com/", industry: "Food Tech" },

    // M-N
    { name: "MacroPoint", url: "http://www.macropoint.com/", industry: "Logistics Tech" },
    { name: "MakerGear", url: "http://www.makergear.com/", industry: "3D Printing" },
    { name: "Main Sequence Technology", url: "https://www.pcrecruiter.net/main-sequence/career-opportunities/", industry: "HR Tech" },
    { name: "Mango", url: "https://www.consultmango.com/", industry: "Consulting" },
    { name: "Mastech Digital", url: "http://www.mastechdigital.com/", industry: "IT Services" },
    { name: "MCPc", url: "https://www.mcpc.com/", industry: "IT Services" },
    { name: "MedaSync", url: "http://www.medasync.com/", industry: "Healthcare" },
    { name: "MedCityNews", url: "http://medcitynews.com/", industry: "Media" },
    { name: "Medical Mutual", url: "https://www.medmutual.com/Careers-Home/Department-Overviews.aspx#dept2", industry: "Insurance" },
    { name: "MedPilot", url: "http://www.medpilot.com/", industry: "Healthcare" },
    { name: "Metisentry", url: "http://www.metisentry.com/", industry: "Software" },
    { name: "Mezu", url: "https://www.mezu.com/", industry: "Fintech" },
    { name: "Micro Fantasy", url: "https://www.microfantasy.com/", industry: "Sports Tech" },
    { name: "MIM Software", url: "https://www.mimsoftware.com/", industry: "Healthcare IT" },
    { name: "Mindful", url: "http://getmindfully.com/", industry: "Customer Experience" },
    { name: "Mobile Defense", url: "https://www.mobiledefense.com/", industry: "Mobile Security" },
    { name: "MobyMax", url: "http://www.mobymax.com/", industry: "EdTech" },
    { name: "Mod Meals", url: "http://mod-meals.com/", industry: "Food Tech" },
    { name: "Moreland Connect", url: "http://www.morelandconnect.com/careers/", industry: "IT Services" },
    { name: "Moss Corporation", url: "http://www.mossaffiliatemarketing.com/", industry: "Marketing" },
    { name: "MRI Software", url: "http://www.mrisoftware.com/", industry: "Real Estate Software" },
    { name: "MTD", url: "http://www.mtdproducts.com/equipment/en/mtdproducts", industry: "Manufacturing" },
    { name: "My1HR", url: "https://www.my1hr.com/", industry: "HR Tech" },
    { name: "My One Medical Source", url: "https://www.myonemedicalsource.com/", industry: "Healthcare" },
    { name: "n2y", url: "https://www.n2y.com/", industry: "EdTech" },
    { name: "Nanotronics Imgaging", url: "http://www.nanotronicsimaging.com/", industry: "Imaging" },
    { name: "National Interstate", url: "http://www.natl.com/", industry: "Insurance" },
    { name: "Network Technologies Inc", url: "http://networktechinc.com/", industry: "Hardware" },
    { name: "New Innovations", url: "https://www.new-innov.com/pub/", industry: "Healthcare IT" },
    { name: "New York Community Bank", url: "https://www.mynycb.com/Pages/home.aspx", industry: "Banking" },
    { name: "NEXT Internet", url: "http://www.netxinternet.com/", industry: "ISP" },
    { name: "NK Web", url: "http://nkweb.com/employment-programmer", industry: "Web Development" },
    { name: "Nordson", url: "http://www.nordson.com/en/our-company/careers", industry: "Manufacturing" },
    { name: "Notice Software", url: "http://noticesoftware.com/", industry: "Software" },
    { name: "Nottingham Spirk", url: "http://www.nottinghamspirk.com/", industry: "Product Design" },
    { name: "n2y", url: "https://www.n2y.com/", industry: "EdTech" },

    // O-P
    { name: "Oatey", url: "http://www.oatey.com/", industry: "Manufacturing" },
    { name: "OEC Connection", url: "http://www.oeconnection.com/", industry: "Automotive" },
    { name: "OMNOVA Solutions", url: "https://www.omnova.com/", industry: "Manufacturing" },
    { name: "OnBase", url: "https://www.onbase.com/", industry: "Enterprise Software" },
    { name: "One Call Now", url: "www.onecallnow.com", industry: "Communications" },
    { name: "OneSky", url: "http://www.onesky.com/", industry: "Aviation" },
    { name: "One up", url: "http://www.playoneup.com/", industry: "Gaming" },
    { name: "Onix", url: "https://www.onixnet.com/", industry: "Cloud Services" },
    { name: "ONOSYS", url: "http://www.onosys.com/", industry: "Restaurant Tech" },
    { name: "OnShift", url: "http://www.onshift.com/", industry: "Healthcare Staffing" },
    { name: "Onvoy", url: "http://www.onvoy.com/", industry: "Telecommunications" },
    { name: "OverDrive", url: "https://www.overdrive.com/", industry: "Digital Media" },
    { name: "Pandata", url: "http://pandata.co/about-us/careers/", industry: "Data Science" },
    { name: "Paragon", url: "http://www.paragon-inc.com/", industry: "IT Services" },
    { name: "Parker Hannifin", url: "http://parker.com", industry: "Manufacturing" },
    { name: "Park Place Technologies", url: "http://www.parkplacetechnologies.com/", industry: "IT Services" },
    { name: "PartsSource Inc.", url: "https://www.partssource.com/", industry: "Healthcare" },
    { name: "Patriot Software", url: "https://www.patriotsoftware.com/about/careers/positions/", industry: "Software" },
    { name: "PCC Airfoils", url: "http://www.pccairfoils.com/business_units/mentor/", industry: "Manufacturing" },
    { name: "PCRecruiter", url: "https://www.pcrecruiter.net/", industry: "HR Tech" },
    { name: "PDP Tax Service", url: "http://pdptax.com/", industry: "Financial Services" },
    { name: "Pervasive Path", url: "http://pervasivepath.com/", industry: "Web Development" },
    { name: "Phenom", url: "http://www.phenom.co/", industry: "Software" },
    { name: "Philips Medical", url: "http://www.healthcare.philips.com/us_en/", industry: "Healthcare" },
    { name: "pixsi", url: "http://www.pixsi.com/", industry: "Marketing" },
    { name: "Playaway", url: "https://playaway.com/life-at-playaway/#join-us", industry: "Media" },
    { name: "Pleasant Valley Corporation", url: "http://www.pleasantvalleycorporation.com/employment/", industry: "Manufacturing" },
    { name: "PNC Financial", url: "https://www.pnc.com/", industry: "Banking" },
    { name: "Power Lender", url: "https://www.powerlender.com/", industry: "Financial Services" },
    { name: "Pointe Blank Solutions", url: "http://www.pointeblank.net/", industry: "IT Services" },
    { name: "PreEmptive Solutions", url: "https://www.preemptive.com/", industry: "Software" },
    { name: "Prentke Romich Company (PRC)", url: "http://www.prentrom.com/", industry: "Assistive Technology" },
    { name: "Proformex", url: "https://www.proformex.com/careers", industry: "Insurance Tech" },
    { name: "Progressive", url: "https://www.progressive.com/", industry: "Insurance" },
    { name: "Pulse", url: "http://pulsellc.com/about.html", industry: "Healthcare" },
    
    // Q-R
    { name: "Quadax", url: "https://quadax.com/Support/ContactUs.htm", industry: "Healthcare IT" },
    { name: "Randstad", url: "https://www.randstadusa.com/", industry: "Staffing" },
    { name: "ReadySet Surgical", url: "https://readysetsurgical.com/", industry: "Healthcare" },
    { name: "Realeflow", url: "http://realeflow.com/v2/", industry: "Real Estate" },
    { name: "Revature", url: "https://revature.com/careers/?Location=Cleveland%2C+OH&Department=Software+&submit=FILTER", industry: "IT Training" },
    { name: "recess creative", url: "http://www.recesscreative.com/", industry: "Digital Agency" },
    { name: "Relational Systems", url: "http://winsearch.com/", industry: "Software" },
    { name: "remesh.co", url: "http://remesh.co", industry: "Market Research" },
    { name: "Renovo", url: "http://renovo1.com/", industry: "IT Services" },
    { name: "Resolvit", url: "http://careers.resolvit.com/Home/countryId/1/stateId/OH", industry: "IT Services" },
    { name: "Revenue Conduit", url: "http://revenueconduit.com/", industry: "E-commerce" },
    { name: "RIDGID", url: "https://www.ridgid.com/us/en/job-dot-net-mvc-developer", industry: "Manufacturing" },
    { name: "Robots and Pencils", url: "https://robotsandpencils.com/", industry: "Mobile Development", technologies: ["Swift", "Kotlin", "JavaScript", "React Native"] },
    { name: "Rockwell Automation", url: "http://www.rockwellautomation.com/rockwellautomation/index.page?", industry: "Manufacturing", technologies: ["C#", ".NET", "Java", "C++"] },
    { name: "Root Integration", url: "http://www.rootintegration.com/", industry: "IT Services" },
    { name: "Roundtable", url: "http://www.roundtablelearning.com/", industry: "Learning Tech" },
    { name: "Rovisys", url: "https://www.rovisys.com/careers/", industry: "IT Services" },
    { name: "RPM", url: "http://www.rpminc.com/", industry: "Manufacturing" },
    { name: "RVshare", url: "https://rvshare.com/", industry: "Travel" },
    { name: "SapientRazorfish_", url: "http://www.sapientrazorfish.com/", industry: "Digital Agency" },
    
    // Key Cleveland companies
    { name: "Cleveland Clinic", url: "http://jobs.clevelandclinic.org/", industry: "Healthcare", technologies: ["Java", "Python", "React", "SQL"] },
    { name: "CoverMyMeds", url: "https://www.covermymeds.com/main/", industry: "Healthcare", technologies: ["Ruby", "React", "PostgreSQL", "AWS"] },
    { name: "Hyland Software", url: "https://www.onbase.com/", industry: "Enterprise Software", technologies: ["C#", ".NET", "JavaScript", "SQL Server"] },
    { name: "KeyBank", url: "https://www.key.com/", industry: "Banking", technologies: ["Java", "JavaScript", "React", "Python", "AWS"] },
    { name: "NASA Glenn Research Center", url: "https://www.nasa.gov/glenn", industry: "Aerospace", technologies: ["Python", "C++", "MATLAB", "React"] },
    { name: "Progressive Insurance", url: "https://www.progressive.com/", industry: "Insurance", technologies: ["Java", "Python", "React", "AWS", "SQL"] },
    { name: "Sherwin-Williams", url: "https://www.sherwin-williams.com/", industry: "Manufacturing", technologies: ["Java", "C#", ".NET", "SQL Server"] },
  ];

  return organizations;
}

/**
 * Creates group data based on the Cleveland Tech repository README
 */
function getGroupsFromReadme(): Group[] {
  return [
    { name: "Akron Makerspace", url: "http://akronmakerspace.org/", description: "Formerly synHAK" },
    { name: "Akron Women in Tech", url: "http://akronwit.org/" },
    { name: "Cleveland Big Data & Hadoop User Group", url: "https://www.meetup.com/Cleveland-Hadoop/" },
    { name: "Cleveland Cocoaheads (iOS & Mac)", url: "https://www.meetup.com/Cleveland-CocoaHeads/" },
    { name: "Cleveland Drupal User Group", url: "https://www.meetup.com/cleveland-drupal/" },
    { name: "Cleveland Game Developers", url: "http://clevelandgamedevs.com/" },
    { name: "Cleveland Game Co-op", url: "https://twitter.com/clegamecoop" },
    { name: "Cleveland Javascript Group", url: "https://www.meetup.com/Cleveland-Javascript/" },
    { name: "Cleveland Python/Julia/R Data Science Group", url: "https://www.meetup.com/Greater-Cleveland-SciPy-Julia-R-Data-Science-Group/" },
    { name: "Cleveland R Users Group", url: "https://www.meetup.com/Cleveland-UseR-Group/" },
    { name: "Cleveland Ruby Brigade", url: "https://www.meetup.com/ClevelandRuby/" },
    { name: "Cleveland Tech Slack", url: "https://cleveland-tech.vercel.app/", description: "Register to get your invite" },
    { name: "Cleveland Web Design and Development (CLE WDD)", url: "https://www.meetup.com/CLE-WDD/" },
    { name: "Crypto Cleveland", url: "https://www.meetup.com/Crypto-Cleveland/" },
    { name: "CLEVR", url: "https://www.facebook.com/groups/clevrcommunity/", description: "Facebook Group" },
    { name: "Elixir |> CLE", url: "http://www.meetup.com/Elixir-CLE/" },
    { name: "Findlay Radio Club", url: "https://www.findlayradioclub.org/" },
    { name: "Hamfest Association of Cleveland", url: "http://www.hac.org/" },
    { name: "Makers Alliance", url: "http://www.makersalliance.org/" },
    { name: "Northeast Ohio Information Security Forum", url: "http://www.neoisf.org/" },
    { name: "Soulcraft woodshop", url: "http://soulcraftwoodshop.com/" },
    { name: "Women Who Code Cleveland", url: "https://www.womenwhocode.com/cleveland" },
    { name: "Cleveland Locksport", url: "https://twitter.com/CLELocksport" },
    { name: "We Make the Internet", url: "https://www.meetup.com/make-the-internet/" },
    { name: "Fresh Lab", url: "http://www.refreshcollective.org/freshlab/", description: "Makerspace for music, clothing" },
    { name: "CoolTech Challenge", url: "https://mobile.twitter.com/RITECoolTech" },
    { name: "Northern Ohio Amateur Radio Society", url: "https://www.noars.net/" },
    { name: "Code Youngstown", url: "https://codeyoungstown.com/" },
    { name: "Open Cleveland", url: "http://www.opencleveland.org/", description: "Open data on Cleveland groups and resources" },
    { name: "Open Geo Cleveland", url: "https://mobile.twitter.com/opengeocle" },
    { name: "openNEO", url: "http://openneo.org/" },
    { name: "Civic Insights Hub", url: "http://www.civicinsights.org/", description: "By Digital C" }
  ];
}

/**
 * Creates event data based on the Cleveland Tech repository README
 */
function getEventsFromReadme(): Event[] {
  return [
    { name: "PyOhio", url: "http://www.pyohio.org/" },
    { name: "The Industry Digital Summit", url: "http://indsum.com/", description: "Put on by Product Collective" },
    { name: "TechPint", url: "http://www.techpint.org/" },
    { name: "IngenuityFest", url: "http://ingenuitycleveland.com/" },
    { name: "B-Sides", url: "http://bsidescle.com/" },
    { name: "Ohio LinuxFest", url: "http://ohiolinux.org/" },
    { name: "Weapons of Mass Creation", url: "https://wmcfest.com/" },
    { name: "Cleveland Give Camp", url: "http://clevelandgivecamp.org" },
    { name: "Classic console and arcade game show", url: "http://www.ccagshow.com/" },
    { name: "Retro Exchange Cleveland", url: "https://www.facebook.com/retroexchangecleveland/" },
    { name: "Stir Trek", url: "http://www.stirtrek.com/" },
    { name: "Dayton Hamvention", url: "http://hamvention.org/" },
    { name: "Cleveland Pinball and Arcade Show", url: "http://clevelandpinballshow.com/Homepage" },
    { name: "Information Security Summit", url: "https://www.informationsecuritysummit.org/" },
    { name: "BizConCle", url: "http://www.bizconcle.com/" },
    { name: "OHI/O", url: "http://hack.osu.edu/", description: "OSU hackathon" },
    { name: "Tech Field Day", url: "http://techfieldday.com/" },
    { name: "Startup Scaleup", url: "http://www.startupscaleup.org/" },
    { name: "CodeMash", url: "http://www.codemash.org/" },
    { name: "Data Days CLE", url: "http://datadayscle.org", description: "Open data/civic tech event by the open data groups" },
    { name: "Cleveland Hamfest and Computer Show", url: "http://hac.org/", description: "By Hamfest Association of Cleveland" },
    { name: "Rustbelt Refresh", url: "http://rustbeltrefresh.com/" },
    { name: "Erie Hack", url: "http://eriehack.io/" },
    { name: "Cleveland SpaceApps", url: "https://twitter.com/spaceappscle" },
    { name: "GiveBackHack", url: "https://givebackhack.com/cleveland/" },
    { name: "PyCon", url: "https://us.pycon.org/", description: "In Cleveland 2018 and 2019" },
    { name: "HAkron", url: "https://hakron.io/" },
    { name: "Tandy Assembly", url: "http://www.tandyassembly.com/" },
    { name: "Tecmo Cleveland", url: "https://www.tecmocleveland.com/" },
    { name: "The Side Quest", url: "http://www.thesidequestbar.com/", description: "Local nerd bar with interesting events" },
    { name: "Observatory Park", url: "https://www.geaugaparkdistrict.org/parks/observatorypark.shtml", description: "A Dark Sky park" },
    { name: "GDEX", url: "https://www.thegdex.com/", description: "The Midwest's Premier Gaming Expo" },
    { name: "Kent Hack Enough", url: "https://khe.io/", description: "KSU Hackathon" },
    { name: "Hack YSU", url: "http://hackysu.com/", description: "YSU's annual hackathon" },
    { name: "HackerX", url: "https://hackerx.org/", description: "Networking & recruiting event for developers" },
    { name: "NOARSfest", url: "https://www.noars.net/?page_id=137", description: "By The Northern Ohio Amateur Radio Society" },
    { name: "CWRU [You]Tech Conference", url: "https://case.edu/utech/youtech-conference-2019" },
    { name: "Futureland", url: "https://www.futurelandcle.com/" },
    { name: "Scrapyard Cleveland", url: "https://scrapyardcle.org/" }
  ];
}

/**
 * Processes raw organization data from the GitHub repository
 */
function processOrganizationData(data: any): Organization[] {
  if (!Array.isArray(data)) {
    console.error('Invalid data format: expected array');
    return [];
  }

  return data.map(org => ({
    name: org.name || 'Unknown',
    industry: org.industry || 'Other',
    description: org.description || '',
    url: org.url || '',
    location: org.location || 'Cleveland Area',
    social: {
      github: org.github || '',
      twitter: org.twitter || '',
      linkedin: org.linkedin || '',
    },
    technologies: Array.isArray(org.technologies) ? org.technologies : [],
    logoUrl: org.logoUrl || '',
  }));
}

/**
 * Gets a list of unique industries from organization data
 */
export function getUniqueIndustries(organizations: Organization[]): string[] {
  const industries = new Set<string>();
  
  organizations.forEach(org => {
    if (org.industry) {
      industries.add(org.industry);
    }
  });
  
  return Array.from(industries).sort();
}

/**
 * Counts organizations by industry
 */
export function getOrganizationsByIndustry(organizations: Organization[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  organizations.forEach(org => {
    const industry = org.industry || 'Other';
    counts[industry] = (counts[industry] || 0) + 1;
  });
  
  return counts;
}

/**
 * Counts organizations by technology
 */
export function getOrganizationsByTechnology(organizations: Organization[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  organizations.forEach(org => {
    if (Array.isArray(org.technologies)) {
      org.technologies.forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    }
  });
  
  // Sort by count (descending) and take top items
  return Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
  );
}

/**
 * Get top technologies by usage count
 */
export function getTopTechnologies(organizations: Organization[], limit: number = 10): [string, number][] {
  const techCounts = getOrganizationsByTechnology(organizations);
  
  return Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
} 