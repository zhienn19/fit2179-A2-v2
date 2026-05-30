// 1. Define your custom HTML annotations for specific years
const dengueNotes = {
    1999: "<strong>1999:</strong> Initial data logging shows early urbanization outbreaks.",
    2002: "<strong>2002:</strong> Dengue strains shift, causing a surge in East Malaysia.",
    2015: "<strong>2015:</strong> Massive nationwide spike; exceeding 100,000 cases.",
    2019: "<strong>2019:</strong> Highest historical peak recorded in Selangor and Johor."
};

const annotationBox = document.getElementById('map-annotation');

// 2. Embed your Vega-Lite visualization
vegaEmbed('#vis1', 'your_vega_lite_spec.json')
  .then(function(result) {
    const view = result.view;

    // 3. Define the update function
    function handleYearChange(signalName, value) {
        // 'value' is the year number coming straight from your Vega slider
        if (dengueNotes[value]) {
            annotationBox.style.display = "block";
            annotationBox.innerHTML = dengueNotes[value];
        } else {
            // Default fallback text for years without specific milestones
            annotationBox.innerHTML = `<strong>${value}:</strong> Steady upward transmission trend across key states.`;
        }
    }

    // 4. Hook into your specific Vega-Lite slider signal
    // Using 'Select_Year' to perfectly match your params JSON snippet
    view.addSignalListener('Select_Year', handleYearChange);

    // Run it once immediately to show the initial year (2019) on page load
    const initialYear = view.signal('Select_Year');
    handleYearChange('Select_Year', initialYear);
  })
  .catch(console.error);