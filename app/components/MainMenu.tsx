import { GetHeaderMenuQuery } from '@/generated/graphql';
import { GET_MENU_BY_NAME } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MainMenu.module.scss';
import BasketMini from './BasketMini';

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

  // console.log('menu', queryData);

  return (
    <nav className={styles.nav}>
      <Link className={styles['logo-link']} href={'/'}>
        <Image
          className={styles['logo-img']}
          height={72}
          width={200}
          alt='logo'
          src={queryData.acfSiteSettings?.acfHeaderMenu?.logo?.node.mediaItemUrl || ''}
          priority
        />
      </Link>
      <ul className={styles.menu}>
        {menu?.map((item, index) => {
          if (item?.hasChildItems) {
            return (
              <li className={styles['menu-item']} key={index}>
                <Link href={item?.link || ''}>{item.label}</Link>
                <ul className={styles['child-menu']}>
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
      <div className={styles['quick-menu']}>
        <div className={styles['quick-item']}>Search</div>
        <div className={styles['quick-item']}>TripAdvisor</div>
        <div className={styles['quick-item']}>
          <Link href={'/basket'}>
            <BasketMini />
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default MainMenu;
