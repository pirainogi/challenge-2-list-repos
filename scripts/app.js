document.addEventListener("DOMContentLoaded", function() {
    // console.log('document ready');

    repoContainer = document.getElementById("repo-container")

    getRepos = () => {
      fetch('https://api.github.com/users/pirainogi/repos')
      .then(r => r.json())
      .then(data => {
        let html = data.map(repodata => repoHTML(repodata))
        repoContainer.innerHTML = html
      })
    }

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

    getRepos()
});
