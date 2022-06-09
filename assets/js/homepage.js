let response = fetch("https://api.github.com/users/octocat/repos");
let userFormEl = document.querySelector("#user-form")
let nameInputEl = document.querySelector("#username")
let repoContainerEl = document.querySelector("#repos-container")
let repoSearchTerm = document.querySelector("#repo-search-term")


let formSubmitHandler = function () {
    event.preventDefault();
    console.log(event)

    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = ""
    } else {
        alert("Please enter a username, doofus")
    }
};

let getUserRepos = function(user) {
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data, user);
        });
    } else {
        alert("Error: User not found")
    };
    });
    .catch(function(error) {
        alert("Unable to connect to GitHub :(")
    })
};

function displayRepos(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repositories Found";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        let titleEl = document.createElement("span");
        titleEl.textContent =  repoName;

        let statusEl = document.createElement("span")
        statusEl.classList = "flex-row align-center"

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.append(titleEl, statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}


getUserRepos();

userFormEl.addEventListener("submit", formSubmitHandler);