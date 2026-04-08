export interface Platform {
  name: string
  domains: string[]
  pathPrefixes: string[]
  placeholder: string
}

const platforms: Platform[] = [
  {
    name: 'Github',
    domains: ['github.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://github.com/johnappleseed',
  },
  {
    name: 'Frontend Mentor',
    domains: ['frontendmentor.io'],
    pathPrefixes: ['/profile/'],
    placeholder: 'e.g. https://frontendmentor.io/profile/johnappleseed',
  },
  {
    name: 'Twitter',
    domains: ['twitter.com', 'x.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://x.com/johnappleseed',
  },
  {
    name: 'LinkedIn',
    domains: ['linkedin.com'],
    pathPrefixes: ['/in/'],
    placeholder: 'e.g. https://linkedin.com/in/johnappleseed',
  },
  {
    name: 'YouTube',
    domains: ['youtube.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://youtube.com/@johnappleseed',
  },
  {
    name: 'Facebook',
    domains: ['facebook.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://facebook.com/johnappleseed',
  },
  {
    name: 'Twitch',
    domains: ['twitch.tv'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://twitch.tv/johnappleseed',
  },
  {
    name: 'Dev.to',
    domains: ['dev.to'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://dev.to/johnappleseed',
  },
  {
    name: 'Codewars',
    domains: ['codewars.com'],
    pathPrefixes: ['/users/'],
    placeholder: 'e.g. https://codewars.com/users/johnappleseed',
  },
  {
    name: 'Codepen',
    domains: ['codepen.io'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://codepen.io/johnappleseed',
  },
  {
    name: 'freeCodeCamp',
    domains: ['freecodecamp.org'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://freecodecamp.org/johnappleseed',
  },
  {
    name: 'GitLab',
    domains: ['gitlab.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://gitlab.com/johnappleseed',
  },
  {
    name: 'Hashnode',
    domains: ['hashnode.com'],
    pathPrefixes: ['/'],
    placeholder: 'e.g. https://hashnode.com/@johnappleseed',
  },
  {
    name: 'Stack Overflow',
    domains: ['stackoverflow.com'],
    pathPrefixes: ['/users/'],
    placeholder: 'e.g. https://stackoverflow.com/users/12345/johnappleseed',
  },
]

export default platforms
