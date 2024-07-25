// reducers/linksReducer.ts

import { LinksState, LinksAction } from './types';

const linksReducer = (usersLinks: LinksState = [], action: LinksAction): LinksState => {
    switch (action.type) {
        case 'initialize links':
            const links = [...action.links];
            links.sort((linkOne, linkTwo) => (linkOne.order > linkTwo.order ? 1 : linkOne.order < linkTwo.order ? -1 : 0));
            return links;

        case 'add link':
            return [...usersLinks, action.link];

        case 'remove link':
            return usersLinks.filter((link) => link.id !== action.linkId);

        case 'update link':
            return usersLinks.map((link) =>
                link.id === action.linkId
                    ? {
                          ...link,
                          platform: action.platform ?? link.platform,
                          link: action.link ?? link.link,
                      }
                    : link
            );

        case 're-order links':
          const linksNew = [...usersLinks];
          linksNew.sort((linkOne, linkTwo) => {
            if(linkOne.order > linkTwo.order)
                return 1;
            else if(linkOne.order < linkTwo.order)
                return -1;
            else
                return 0;
          })

        case 'sort links':
          const { removed, index } = action.indices;
          const linksCopy = [...usersLinks];
          linksCopy.splice(index, 0, removed);
          return linksCopy;

          // dispatch({ type: 'sort links', removed: removed, index: result.destination.index });

        // case 'pre-order links':
        //   const hoverLinkIndex = action.indices.hoverLink;
        //     const dropLinkIndex = action.indices.dropLink;
        //     const linksCopy = [...usersLinks];
        //     let temp = linksCopy[hoverLinkIndex].order;
        //     linksCopy[hoverLinkIndex].order = linksCopy[dropLinkIndex].order;
        //     linksCopy[dropLinkIndex].order = temp;
        //     linksCopy.sort((linkOne, linkTwo) => {
        //         if(linkOne.order > linkTwo.order)
        //             return 1;
        //         else if(linkOne.order < linkTwo.order)
        //             return -1;
        //         else
        //             return 0;
        //     })
        //     console.log('i am reordering'+dropLinkIndex+'::'+hoverLinkIndex);
        //     console.log(linksCopy);
        //     return linksCopy;
            // const { hoverLink, dropLink } = action.indices;
            // const linksCopy = [...usersLinks]; console.log(linksCopy);
            // const temp = linksCopy[hoverLink].order;
            // linksCopy[hoverLink].order = linksCopy[dropLink].order;
            // linksCopy[dropLink].order = temp;
            // linksCopy.sort((linkOne, linkTwo) => (linkOne.order > linkTwo.order ? 1 : linkOne.order < linkTwo.order ? -1 : 0));
            // return linksCopy;

        default:
            return usersLinks;
    }
};

export default linksReducer;
