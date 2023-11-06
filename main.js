const dateRegex = /(\d{2}[-/]\d{2}[-/]\d{4})/;
const table = $("#example").DataTable();
let customFilterActive = false;
let resultsCont = 0;
DataTable.ext.search.push(function (settings, data, dataIndex) {
  if (!customFilterActive) {
    return true; // Skip the custom filter if it's not active
  }
  let min = $("#startDate").val();
  let max = $("#endDate").val();
  min = new Date(min); // this value will be customizable
  max = new Date(max);
  let dateRow = data[1];
  let dateMatch = dateRow.match(dateRegex);
  const [day, month, year] = dateMatch[1].split("-");
  const jsDate = new Date(`${year}-${month}-${day}`);
  dateRow = jsDate;

  if (
    (min === "" && max === "") ||
    (min === "" && dateRow <= new Date(max)) ||
    (min <= dateRow && max === "") ||
    (min <= dateRow && dateRow <= new Date(max))
  ) {
    resultsCont++;
    return true;
  }
  return false;
});

$("#filterBtn").on("click", function () {
  resultsCont = 0;
  customFilterActive = true; // Set the flag to indicate that the custom filter should be active
  table.draw();
  // Redraw the table to apply the custom filter
  console.log(resultsCont.toString());
  $("#example2").text(resultsCont);
});

// Optionally, you can add a "Clear Filter" button to deactivate the custom filter
$("#clearFilterBtn").on("click", function () {
  customFilterActive = false; // Set the flag to indicate that the custom filter should not be active
  table.draw(); // Redraw the table to clear the custom filter
});
