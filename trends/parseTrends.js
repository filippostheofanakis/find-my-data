const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

function parseTrendsData(filePath) {
  let currentSection = "";
  const trendsData = {
    TOP: [],
    RISING: [],
  };

  fs.createReadStream(filePath)
    .pipe(
      parse({
        delimiter: ",",
        relax_column_count: true,
        skip_empty_lines: true,
      })
    )
    .on("data", (row) => {
      if (row[0] === "Category: All categories" || row[0] === "") {
        // Skip these rows
        return;
      } else if (row[0] === "TOP" || row[0] === "RISING") {
        // This is a section header
        currentSection = row[0];
        return;
      } else if (currentSection) {
        // This is a data row
        const entry = {
          keyword: row[0],
          score: row.length > 1 ? row[1] : undefined, // Handle rows with only one column
        };
        trendsData[currentSection].push(entry);
      }
    })
    .on("end", () => {
      console.log(
        "Trend data parsed successfully:",
        JSON.stringify(trendsData, null, 2)
      );
    })
    .on("error", (error) => {
      console.error("Error parsing trends data:", error);
    });
}

// Call the function with the path to your downloaded Google Trends CSV file
parseTrendsData(path.join(__dirname, "data/relatedEntities.csv"));
