import type { Metadata } from 'next';
import styles from './blog.module.scss';
import TripAdvisor from './blogComponents/TripAdvisorWidget';

export const metadata: Metadata = {
  title: 'Blog - My Website',
  description: 'Welcome to our blog where we share updates, ideas, and news.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Blog Header */}
      <header className={styles.blogHeader}>
        <div className={styles.headerContent}>
          <h1>Welcome</h1>
          <p className={styles.subHeader}>Activities | Recommendations | Ideas | News</p>
          <h2>Let&apos;s dive in!</h2>
        </div>
      </header>

      {/* "Read what we blog about" Section */}
      <div className={styles.readSection}>
        <div className={styles.line}></div>
        <div className={styles.readText}>
          <span className={styles.readIcon}>🔍</span>
          <span>Read what we blog about</span>
        </div>
        <div className={styles.line}></div>
      </div>

      {/* Main Blog Content */}
      <main>
        <div className='wrapper'>
          <div className='row'>
            <aside className='blog sidebar'>
              <TripAdvisor />
            </aside>
            <div className='column'>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
