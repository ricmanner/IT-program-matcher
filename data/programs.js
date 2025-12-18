const programs = [
  {
    id: 'systemvetenskap',
    name: 'Systemvetenskap',
    url: 'https://www.his.se/utbildning/data-och-it/systemvetenskap-syveg/',
    courseIds: [
      'databassystem','grundlaggande-programmering-cpp','informationssakerhet-riskhantering',
      'introduktion-till-informationssakerhet','introduktion-till-systemvetenskap','it-i-organisationer-introduktion',
      'webbutveckling-webbplatsdesign','business-process-management','data-warehousing-teknologier-och-metoder',
      'databaskonstruktion','foretagsprojekt-inriktning-informationssystemutveckling','utveckling-av-it-i-organisationer-systemvetenskap',
      'webbutveckling-xml-api','aktuella-trender-i-informationssystem',
      // electives
      'introduktion-till-ux-design','it-forensik','manniskans-kognitiva-formagor-och-it','statistik','webbprogrammering'
    ]
  },
  {
    id: 'datavetenskap',
    name: 'Datavetenskap',
    url: 'https://www.his.se/utbildning/data-och-it/datavetenskap-inriktning-systemutveckling-dvsug/',
    courseIds: [
      'databassystem','datakommunikation-introduktion','datorns-grunder','diskret-matematik',
      'grundlaggande-programmering-cpp','introduktion-till-ux-design','statistik','algoritmer-och-datastrukturer',
      'databaskonstruktion','distribuerade-system','introduktion-till-artificiell-intelligens',
      'objektorienterad-programmering','operativsystem','parallella-processer','programvarutestning',
      'projekt-i-software-engineering','software-engineering','webbutveckling-xml-api','systemutveckling-forskning-och-utveckling'
    ]
  },
  {
    id: 'natverks-och-systemadministration',
    name: 'Nätverks- och systemadministration',
    url: 'https://www.his.se/utbildning/data-och-it/natverks--och-systemadministration-nsarg/',
    courseIds: [
      'databassystem','datakommunikation-introduktion','datorns-grunder','grundlaggande-programmering-cpp',
      'informationssakerhet-riskhantering','introduktion-till-informationssakerhet','tradlosa-natverk',
      'datakommunikation-routing-och-switching','informationssakerhet-natverkssakerhet','it-forensik','linux-administration',
      'operativsystem','projekt-i-design-av-it-infrastruktur','scriptprogrammering','systemadministration-och-anvandarsupport',
      'virtualisering-moln-och-lagring','windows-administration-i','hallbar-utveckling','vetenskapliga-metoder'
    ]
  },
  {
    id: 'business-intelligence',
    name: 'Business intelligence',
    url: 'https://www.his.se/utbildning/data-och-it/informationsteknologi-business-intelligence-itbig/',
    courseIds: [
      'databassystem','grundlaggande-programmering-cpp','informationssakerhet-riskhantering','introduktion-till-businessintelligence',
      'introduktion-till-informationssakerhet','it-i-organisationer-introduktion','webbutveckling-webbplatsdesign','businessintelligence-praktisk-analys',
      'data-warehousing-teknologier-och-metoder','databaskonstruktion','foretagsprojekt-inriktning-businessintelligence','utveckling-av-it-i-organisationer-businessintelligence',
      'webbutveckling-xml-api','businessintelligence-aktuella-trender',
      // electives
      'introduktion-till-ux-design','it-forensik','manniskans-kognitiva-formagor-och-it','statistik','webbprogrammering'
    ]
  },
  {
    id: 'user-experience-design',
    name: 'User Experience Design',
    url: 'https://www.his.se/utbildning/data-och-it/user-experience-design-uxdpg/',
    courseIds: [
      'introduktion-till-informationssakerhet','introduktion-till-ux-design','it-i-organisationer-introduktion',
      'manniskans-kognitiva-formagor-och-it','webbutveckling-webbplatsdesign','affective-interaction-och-emotioner',
      'forskningsmetoder-och-tekniker-inom-ux-design','prototyping-och-granssnittsdesign','prototypprojekt',
      'service-design','social-computing-och-datorstott-samarbete','ux-design-forskning-och-utveckling',
      'ux-design-projekt-i-extern-organisation','utvarderingsmetoder-inom-ux-design'
    ]
  }
]

export default programs
