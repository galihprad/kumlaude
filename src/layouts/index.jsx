import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import Navigation from "../components/Navigation/Navigation";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags") {
      title = "Tags";
    } else if (currentPath === "categories") {
      title = "Categories";
    } else if (currentPath === "about") {
      title = "About";
    } else if (currentPath.includes("posts")) {
      title = "Article";
    } else if (currentPath.includes("tags")) {
      const tag = currentPath
        .replace("tags", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.includes("categories")) {
      const category = currentPath
        .replace("categories", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }
  render() {
    const { children, data } = this.props;
    return (
      <Navigation config={config} LocalTitle={this.getLocalTitle()} contentList={data.allDirectory.edges}>
        <div>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
          </Helmet>
          {children()}
        </div>
      </Navigation>
    );
  }
}

export const pageQuery = graphql`
  query dirQuery {
    allDirectory {
      edges {
        node {
          relativePath
          name
          relativeDirectory
        }
      }
    }
  } 
`;