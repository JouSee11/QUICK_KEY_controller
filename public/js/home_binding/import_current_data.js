function importDataHandler(data) {
    if (!confirm("Import current data and overwrite the current binding?")) return
    const jsonData = JSON.parse(data.substring(8))
    console.log(`Original data ${data}`)
    console.log(`Converted data ${JSON.stringify(jsonData)}`)

    addLoadedDataToList(jsonData)
    addInitialValuesUI()
    
    // buttonsList.forEach((button) => {
    //     const buttonNumber = button.dataset.keyNum
    //     const curData = jsonData[buttonNumber]
        
    //     //check if button had some binded value
    //     if (curData.length !== 0) {
    //         keyBindingValues.set(Number(buttonNumber), new Set(curData))
    //         button.textContent = Array.from(curData).join(" + ")
    //         button.classList.add("binded")
    //     } else {
    //         keyBindingValues.set(Number(buttonNumber), new Set([]))
    //     }
        
    // })
    
}
