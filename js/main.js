var siteName = document.getElementById("site-name");
var siteLink = document.getElementById("site-link");
var errorPopup = document.getElementById("error");
var addSiteBtn = document.getElementById("add-book");
var nameStatus = document.getElementById("name-status");
var linkStatus = document.getElementById("link-status");
var errorModal = new bootstrap.Modal("#error");

var siteList;
if (JSON.parse(localStorage.getItem("bookmarks"))) siteList = JSON.parse(localStorage.getItem("bookmarks"));
else siteList = [];

display(siteList);

// apply add site action in submit button click
addSiteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkName() && checkLink()) {
    addSite();
  } else {
    showPopup();
  }
});

// add new bookmark site to the siteList
function addSite() {
  var site = {
    name: siteName.value,
    link: siteLink.value,
  };

  siteList.push(site);
  localStorage.setItem("bookmarks", JSON.stringify(siteList));

  siteName.value = "";
  siteLink.value = "";
  nameStatus.innerHTML = "";
  linkStatus.innerHTML = "";

  display(siteList);
}

// delete an entire bookmarked site row
function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(siteList));
  display(siteList);
}

// display the bookmared sites in the table
function display(list) {
  var bookSites = "";
  for (var site of list) {
    bookSites += `
    <tr>
     <td>${list.indexOf(site) + 1}</td>
     <td>${site.name}</td>
     <td>
      <a target="_blank" href="${site.link.toLowerCase()}">
       <button type="button" class="btn btn-warning btn-sm px-3 py-1">
        <i class="fa-solid fa-eye me-1"></i>
        Visit
       </button>
      </a>
     </td>
     <td>
      <button type="button" class="btn btn-danger btn-sm px-3 py-1" onclick="deleteSite(${list.indexOf(site)})">
       <i class="fa-solid fa-trash-can me-1"></i>
       Delete
      </button>
     </td>
    </tr>
  `;
  }
  document.querySelector("#site-tbl tbody").innerHTML = bookSites;
}

// check if website name is valid
function checkName() {
  var isNameValid = /^[A-Z]\w{2,}/;
  if (isNameValid.test(siteName.value)) return true;
  else return false;
}

// check if website url is valid
function checkLink() {
  var isLinkValid = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;
  if (isLinkValid.test(siteLink.value)) return true;
  else return false;
}

// error popup for incorrect input
function showPopup() {
  errorModal.show();

  if (!checkName() && !checkLink()) {
    document.getElementById("error-title").innerHTML = `Incorrect Bookmark Name & Website URL`;
    document.getElementById("error-content").innerHTML = `
    <ul class="list-group">
    <li class="list-group-item border-0 px-0 py-1 text-body-secondary"><i class="fa-regular fa-circle-xmark me-1"></i>Site name must contain <strong>at least 3 characters</strong> and should begin with a <strong>Capital</strong>
    letter!</li>
    <li class="list-group-item border-0 px-0 py-1 text-body-secondary"><i class="fa-regular fa-circle-xmark me-1"></i>Site URL must be a <strong>valid</strong> one!</li>
    </ul>
    `;
  } else if (!checkName()) {
    document.getElementById("error-title").innerHTML = `Incorrect Bookmark Name`;
    document.getElementById(
      "error-content"
    ).innerHTML = `<i class="fa-regular fa-circle-xmark me-1"></i>Site name must contain <strong>at least 3 characters</strong> and should begin with a <strong>Capital</strong>
    letter!`;
  } else if (!checkLink()) {
    document.getElementById("error-title").innerHTML = `Incorrect Website URL`;
    document.getElementById(
      "error-content"
    ).innerHTML = `<i class="fa-regular fa-circle-xmark me-1"></i>Site URL must be a <strong>valid</strong> one!`;
  }
}

// check if website name is being entered correctly
siteName.addEventListener("input", function (e) {
  if (!e.target.value) {
    e.target.classList.remove("correct-focus");
    e.target.classList.remove("wrong-focus");
    nameStatus.innerHTML = "";
  } else if (e.target.value && checkName()) {
    e.target.classList.add("correct-focus");
    e.target.classList.remove("wrong-focus");
    nameStatus.innerHTML = `<i class="fa-solid fa-circle-check text-correct"></i>`;
  } else {
    e.target.classList.add("wrong-focus");
    e.target.classList.remove("correct-focus");
    nameStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation text-wrong"></i>`;
  }
});

// check if website link is being entered correctly
siteLink.addEventListener("input", function (e) {
  if (!e.target.value) {
    e.target.classList.remove("correct-focus");
    e.target.classList.remove("wrong-focus");
    linkStatus.innerHTML = "";
  } else if (e.target.value && checkLink()) {
    e.target.classList.add("correct-focus");
    e.target.classList.remove("wrong-focus");
    linkStatus.innerHTML = `<i class="fa-solid fa-circle-check text-correct"></i>`;
  } else {
    e.target.classList.add("wrong-focus");
    e.target.classList.remove("correct-focus");
    linkStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation text-wrong"></i>`;
  }
});
