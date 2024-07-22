document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const updateCheckboxState = (checkboxStates) => {
    checkboxStates.forEach((checked, index) => {
      const checkbox = document.getElementById(`checkbox-${index}`);
      if (checkbox) {
        checkbox.checked = checked;
      }
    });
  };

  const updateSingleCheckbox = ({ index, checked }) => {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox) {
      checkbox.checked = checked;
    }
  };

  const handleCheckboxChange = (index, checkbox) => {
    socket.emit("checkboxChange", {
      index,
      checked: checkbox.checked,
    });
  };

  socket.on("initialState", updateCheckboxState);
  socket.on("checkboxUpdate", updateSingleCheckbox);

  document.querySelectorAll(".checkbox").forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      handleCheckboxChange(index, checkbox);
    });
  });
});
