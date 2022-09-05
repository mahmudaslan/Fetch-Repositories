let theInput = document.querySelector(".repos-container input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data ");

getButton.addEventListener("click", () => {
  gerReps();
});

function gerReps() {
  if (theInput.value == "") {
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((repos) => repos.json())
      .then((data) => {
        reposData.innerHTML = "";

        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          mainDiv.className = "repo-box";

          let theUrl = document.createElement("a");
          let theUrlText = document.createTextNode("Visate");
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.appendChild(theUrlText);
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);

          let span = document.createElement("span");
          let spanText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          span.appendChild(spanText);
          mainDiv.append(span);

          reposData.appendChild(mainDiv);
        });
      });
  }
}
