const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector("button");

// Load notes when page loads
document.addEventListener("DOMContentLoaded", showNotes);

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
        attachNoteEvents();
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachNoteEvents() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        if (!nt.hasAttribute("data-events-attached")) {
            nt.addEventListener("input", updateStorage);
            nt.setAttribute("data-events-attached", "true");
        }
    });
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.alt = "Delete note";
    inputBox.appendChild(img);
    
    // Add new note at the top
    notesContainer.insertBefore(inputBox, notesContainer.firstChild);
    
    // Focus and save
    inputBox.focus();
    updateStorage();
    attachNoteEvents();
});

// Handle note deletion
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Handle Enter key for line breaks
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.target.classList.contains("input-box")) {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
});