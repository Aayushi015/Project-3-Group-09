
const Source = () => {
    const references = [
      {
        text: "U.S. Pollution Data 2000-2023",
        link: "https://www.kaggle.com/datasets/guslovesmath/us-pollution-data-200-to-2022",
        source: "Kaggle Data Set",
      },
      {
        text: "U.S. EPA",
        link: "https://www.epa.gov/aqs",
        source: "United States Environmental Protection Agency",
      },
      {
        text: "CARTO. Mapping Data.",
        link: "https://www.carto.com/",
        source: "Carto",
      },
    ];
  
    return (
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">References</h2>
        
        <div className="space-y-4">
          {references.map((ref, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {ref.text}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{ref.source}</p>
                </div>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 px-3 py-2 text-sm bg-white text-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Visit Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default Source
  