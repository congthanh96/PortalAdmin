import React, { useState } from "react";
import NoSSR from "react-no-ssr";
import BlogItem from "../../components/Blog/BlogItem";
import Row from "../../components/Util/Row";
import { blogItemMargin } from "../../stylesheets/Blog.module.sass";
import MetaDecorator from "../../components/Util/MetaDecorator";

import metaThumbnail from "../../data/images/meta/logo.png";

const blog = require("../../data/blog.json");

const Blog = () => {
  // const [isDark, setIsDark] = useState(getInitialTheme());

  // eslint-disable-next-line max-len
  const noSSRContent = blog.blogItems.map((blogItem) => (
    <BlogItem
      className={blogItemMargin}
      title={blogItem.title}
      date={blogItem.date}
      minutes={blogItem.minutes}
      subtitle={blogItem.subtitle}
      blogPost={blogItem.blogPost}
      // isDark={isDark}
      key={blogItem.title}
    />
  ));

  const content = (
    <div>
      <MetaDecorator
        description={blog.pageDescription}
        title={blog.pageTitle}
        imageUrl={metaThumbnail}
        imageAlt={blog.metaImageAlt}
      />

      <h2>Test Blog THAV</h2>
    </div>
  );

  return <NoSSR>{content}</NoSSR>;
};

export default Blog;
