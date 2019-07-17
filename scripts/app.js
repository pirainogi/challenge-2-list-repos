document.addEventListener("DOMContentLoaded", function() {
    // console.log('document ready');

    // grabbing the container to add all of my repo cards to
    repoContainer = document.getElementById("repo-container")

    // fn makes the fetch to the Github API and then maps over all the
    // returned data and returns HTML
    // then adds the returned HTML to the container element
    getRepos = () => {
      fetch('https://api.github.com/users/pirainogi/repos')
      .then(r => r.json())
      .then(data => {
        let html = data.map(repodata => repoHTML(repodata))
        repoContainer.innerHTML = html
      })
    }

    //makes HTML for above
    repoHTML = (repo) => {
      return `
      <div class="row repo">
          <h3>
              <a href="${repo.html_url}">
                  ${repo.name}
              </a>
          </h3>
          <p><strong>Description:</strong>
              <span>${repo.description ? repo.description : `This is a ${repo.language} repository` }</span>
          </p>
          <p><strong>Owner:</strong>
              <span>@${repo.owner.login}</span>
          </p>
          <div class="stats">
              <div class="col-sm-1 stars">
              <svg class="icon" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                  <use xlink:href="./svg/sprites.svg#star"></use>
              </svg>
                  <span>Stars: ${repo.stargazers_count}</span>
              </div>
              <div class="col-sm-1 forks">
                  <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                      <use xlink:href="./svg/sprites.svg#fork"></use>
                  </svg>
                  <span>Forks: ${repo.forks}</span>
              </div>
          </div>
      </div>
      `
    }

    //call the fn to make the fetch and render the repos on the DOM
    getRepos()
});

// I would have liked to find a way to pull either the most recent repos
// or my starred repos instead of just the first 30 alphabetically
// but the API keeps returning a 403 error related to my IP hitting their API
// too frequently. :/ 
