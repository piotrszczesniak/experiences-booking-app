import { GetHeaderMenuQuery, Menu, MenuItem } from '@/generated/graphql';
import { GET_MENU_BY_NAME } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Basket';

const MainMenu = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_MENU_BY_NAME,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const queryData: GetHeaderMenuQuery = data;
  const menu = queryData.acfSiteSettings?.acfHeaderMenu?.menuItems;

  console.log(menu);

  return (
    <nav>
      <Link className='logo' style={{ display: 'inline-flex' }} href={'/'}>
        <Image
          loading='eager'
          height={72}
          width={200}
          alt='logo'
          src={queryData.acfSiteSettings?.acfHeaderMenu?.logo?.node.mediaItemUrl || ''}
        />
      </Link>
      <ul className='menu'>
        {menu?.map((item, index) => {
          if (item?.hasChildItems) {
            return (
              <li key={index}>
                <Link href={item?.link || ''}> {item.label} </Link>
                <ul className='child-menu'>
                  {item.childMenuItems?.map((childItem, childIndex) => {
                    return (
                      <li key={childIndex}>
                        <Link href={childItem?.link || ''}>{childItem?.label} </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          if (!item?.hasChildItems) {
            return (
              <li key={index}>
                <Link href={item?.link || ''}> {item?.label} </Link>
              </li>
            );
          }
        })}
      </ul>
      <div className='searchbar'>Search</div>
      <div className='tripadvisor'>TripAdvisor</div>
      <Cart />
    </nav>
  );
};
export default MainMenu;
