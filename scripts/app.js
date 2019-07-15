document.addEventListener("DOMContentLoaded", function() {
    console.log('document ready');

    getRepos = () => {
      fetch('https://api.github.com/users/pirainogi/repos')
      .then(r => r.json())
      .then(data => console.log('fetch', data))
    }

    getRepos()
});
