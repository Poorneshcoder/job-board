const JobPosting = ({ url, title, by, time }) => {
    const formateTime = new Date(time * 1000).toLocaleString();
    return (
      <div className="post" role="listItem">
        <h2 className="post__title">
          <a
            className={url ? "" : "inactiveLink"}
            href={url}
            target="_blank"
            rel="noopener"
          >
            {title}
          </a>
        </h2>
        <span className="post__metadata">
          By {by} . {formateTime}
        </span>
      </div>
    );
}

export default JobPosting;


  