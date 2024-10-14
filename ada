[1mdiff --git a/app/blog/[slug]/page.tsx b/app/blog/[slug]/page.tsx[m
[1mindex c18dc69..f5579f0 100644[m
[1m--- a/app/blog/[slug]/page.tsx[m
[1m+++ b/app/blog/[slug]/page.tsx[m
[36m@@ -19,10 +19,14 @@[m [mconst SingleBlog = async ({ params }: { params: { slug: string } }) => {[m
 [m
   const queryData: GetPostQuery = data;[m
   const post = queryData.post;[m
[31m-  // console.log(post?.categories.nodes[0]);[m
[32m+[m[32m  console.log(post?.categories?.nodes.map((category) => category.name));[m
[32m+[m[32m  // console.log('sss');[m
[32m+[m
   return ([m
     <main>[m
[31m-      {/* <h3>{post?.categories[0].name}</h3> */}[m
[32m+[m[32m      {post?.categories?.nodes.map((category, index) => ([m
[32m+[m[32m        <div key={index}>{category.name}</div>[m
[32m+[m[32m      ))}[m
       <h1>{post?.title}</h1>[m
       <article dangerouslySetInnerHTML={{ __html: post?.content || '' }} />[m
     </main>[m
[1mdiff --git a/app/blog/page.tsx b/app/blog/page.tsx[m
[1mindex c52f31d..84daa32 100644[m
[1m--- a/app/blog/page.tsx[m
[1m+++ b/app/blog/page.tsx[m
[36m@@ -17,20 +17,25 @@[m [mconst BlogHome = async () => {[m
       },[m
     },[m
   });[m
[31m-  console.log(data.posts.nodes);[m
[31m-  console.log('su');[m
   const posts: Post[] = data?.posts?.nodes;[m
 [m
   return ([m
[31m-    <ol>[m
[31m-      {posts?.map((item, index) => {[m
[31m-        return ([m
[31m-          <li key={index}>[m
[31m-            <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>[m
[31m-          </li>[m
[31m-        );[m
[31m-      })}[m
[31m-    </ol>[m
[32m+[m[32m    <>[m
[32m+[m[32m      <ol>[m
[32m+[m[32m        {posts?.map((item, index) => {[m
[32m+[m[32m          return ([m
[32m+[m[32m            <li key={index}>[m
[32m+[m[32m              <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>[m
[32m+[m[32m            </li>[m
[32m+[m[32m          );[m
[32m+[m[32m        })}[m
[32m+[m[32m      </ol>[m
[32m+[m[32m      <div className="pagination">[m
[32m+[m[32m        <button>prev</button>[m
[32m+[m[32m        ...[m
[32m+[m[32m        <button>next</button>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </>[m
   );[m
 };[m
 export default BlogHome;[m
