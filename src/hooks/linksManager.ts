import { LinksState, LinksAction } from './types'

const linksReducer = (
  usersLinks: LinksState = [],
  action: LinksAction
): LinksState => {
  switch (action.type) {
    case 'initialize links': {
      const links = [...action.links]
      links.sort((linkOne, linkTwo) =>
        linkOne.order > linkTwo.order
          ? 1
          : linkOne.order < linkTwo.order
            ? -1
            : 0
      )
      return links
    }

    case 'add link':
      return [...usersLinks, action.link]

    case 'remove link':
      return usersLinks.filter((link) => link.id !== action.linkId)

    case 'update link':
      return usersLinks.map((link) =>
        link.id === action.linkId
          ? {
              ...link,
              platform: action.platform ?? link.platform,
              link: action.link ?? link.link,
            }
          : link
      )

    case 're-order links': {
      const { removed, index } = action.indices
      const reorderedLinks = [...usersLinks]
      reorderedLinks.splice(index, 0, removed)
      return reorderedLinks
    }

    default:
      return usersLinks
  }
}

export default linksReducer
