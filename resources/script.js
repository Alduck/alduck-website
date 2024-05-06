const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const removeWheelBtn = document.getElementById("remove-wheel-btn");
const finalValue = document.getElementById("final-value");
const annoyingArrow=document.getElementById("arrow");
const submitbtn=document.getElementById("submit-btn");
const userinputbtn=document.getElementById("user-input");
const restartbtn=document.getElementById("restart");
// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 45, value: "-ım -im" },
  { minDegree: 46, maxDegree: 90, value: "-er -ar" },
  { minDegree: 91, maxDegree: 135, value: "-gın/gin/gan/gen" },
  { minDegree: 136, maxDegree: 180, value: "-de/da/den/dan" },
  { minDegree: 181, maxDegree: 225, value: "-cı/ci/çı/çi" },
  { minDegree: 226, maxDegree: 270, value: "-y/yor" },
  { minDegree: 271, maxDegree: 315, value: "-cık/cek" },
  { minDegree: 316, maxDegree: 360, value: "-ı/i, -u/ü, -a/e" },
];

// Size of each piece
const data = [12, 12, 12, 12, 12, 12, 12, 12];

// Background color for each piece
const pieColors = [
  "#FF0000",
  "#008000",
  "#0000FF",
  "#A020F0",
  "#FFA500",
  "#964B00",
];

// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels (values which are to be displayed on chart)
    labels: [
      "-er -ar",
      "-ım/im",
      "-ı/i -u/ü",
      "-cık/cek",
      "-y/yor",
      "-cı/ci",
      "de/den",
      "-gın/gin",
    ],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 15 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
	
      finalValue.innerHTML = `<p>Size çıkan ek: ${i.value}</p>`;
	    selectedValue = i.value; // update selectedValue
      spinBtn.disabled = true;
      
      removeWheelBtn.disabled = false; // Enable the remove button
      removeWheelBtn.style.display = "inline-block";
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
// Start spinning
spinBtn.addEventListener("click", () => {
	 var audio = document.getElementById("wheelSound1");
var audio2 = document.getElementById("wheelSound2");
	audio.play();
	audio2.play();
  spinBtn.disabled = true;
  removeWheelBtn.disabled = true; // Disable remove button while spinning
  // Empty final value
  finalValue.innerHTML = `<p>Çarkınız çevriliyor...</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value
    myChart.update();
	  audio.pause();
	audio2.pause();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
restartbtn.addEventListener("click", () => {

  location.reload();

})


removeWheelBtn.addEventListener("click", () => {
  // Remove the wheel
  wheel.remove();
  annoyingArrow.remove();
  // Handle submit button click
  removeWheelBtn.style.display = "none";
  spinBtn.style.display = "none";
  
  // CIK CEK 
  if(selectedValue.includes("-cık/cek"))
    {
    var words = ["alçak", "ufak", "büyük", "küçük", "minik"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-cık/cek". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-ım -im"))
    {
    var words = ["had", "hak", "his", "kıvır", "devir", "ayır"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-ım -im". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-ı/i, -u/ü, -a/e"))
    {
    var words = ["sır", "af", "his", "alın", "akıl", "karın", "gönül", "kulak", "inat", "dolap"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-ı/i, -u/ü, -a/e". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-de/da/den/dan"))
    {
    var words = ["kalıp", "balık", "eşik", "ağaç"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-de/da/den/dan". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-y/yor"))
    {
    var words = ["tara", "sakla", "bekle", "yazma", "söyle"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-y/yor". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-er -ar"))
    {
    var words = ["sarı", "yeşil"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-er -ar". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-gın/gin/gan/gen"))
    {
    var words = ["bas", "üret", "seç"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-gın/gin/gan/gen". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else if(selectedValue.includes("-cı/ci/çı/çi"))
    {
    var words = ["sanat", "iş", "kayık", "halk"];
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomassWord = words[randomIndex];
    console.log("Random word:", randomassWord);
    submitbtn.style.display = "inline-block";
    userinputbtn.style.display ="inline-block";
    finalValue.innerHTML = `
     <p>Size çıkan kelime:'${randomassWord}'. Size çıkan ek: "-cı/ci/çı/çi". Bu kelime ve eki birleştirin.</p>`
    // <input type="text" id="user-input">
   // <button id="submit-btn">Submit</button>
  }
  else {
    console.log("this is a perfectly expected situation. yknow what youre doin.")
  }

  // Handle submit button click
  document.getElementById("submit-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    console.log("User input:", userInput);
    // CIK CEK
    if (selectedValue.includes("-cık/cek")) {
      if (userInput.toLowerCase() === "ufacık"&& randomassWord == "ufak")
      {
        console.log("Accepted input:", userInput);
        finalValue.innerHTML = `
        <p>Harika. Peki "ufacık" kelimesindeki ses olayı nedir?</p>`
       // <input type="text" id="user-input2">
      // <button id="submit-btn">Submit</button>`
       document.getElementById("submit-btn").addEventListener("click", () => {
        const userInput2 = document.getElementById("user-input").value;
        console.log("User input:", userInput2)
             if (userInput2.toLowerCase() === "ünsüz düşmesi")
              {
                console.log("accepted.");
                submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                finalValue.innerHTML = `
                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                 restartbtn.style.display = "inline-block";
              }
              else{
                console.log("rejected.");
              }
       })
      }
      if (selectedValue.includes("-cık/cek")) {
        if (userInput.toLowerCase() === "alçacık"&& randomassWord == "alçak")
        {
          console.log("Accepted input:", userInput);
          finalValue.innerHTML = `
          <p>Harika. Peki "alçacık" kelimesindeki ses olayı nedir?</p>`
         // <input type="text" id="user-input2">
        // <button id="submit-btn">Submit</button>`
         document.getElementById("submit-btn").addEventListener("click", () => {
          const userInput2 = document.getElementById("user-input").value;
          console.log("User input:", userInput2)
               if (userInput2.toLowerCase() === "ünsüz düşmesi")
                {
                  console.log("accepted.");
                  submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                  finalValue.innerHTML = `
                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                 restartbtn.style.display = "inline-block";
                }
                else{
                  console.log("rejected.");
                }
         })
        }
      } 
      if (selectedValue.includes("-cık/cek")) {
        if (userInput.toLowerCase() === "minicik"&& randomassWord == "minik")
        {
          console.log("Accepted input:", userInput);
          finalValue.innerHTML = `
          <p>Harika. Peki "minicik" kelimesindeki ses olayı nedir?</p>`
         // <input type="text" id="user-input2">
        // <button id="submit-btn">Submit</button>`
         document.getElementById("submit-btn").addEventListener("click", () => {
          const userInput2 = document.getElementById("user-input").value;
          console.log("User input:", userInput2)
               if (userInput2.toLowerCase() === "ünsüz düşmesi")
                {
                  console.log("accepted.");
                  submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                  finalValue.innerHTML = `
                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                 restartbtn.style.display = "inline-block";
                }
                else{
                  console.log("rejected.");
                }
         })
        }
      }
      if (selectedValue.includes("-cık/cek")) {
        if (userInput.toLowerCase() === "büyücek"&& randomassWord == "büyük")
        {
          console.log("Accepted input:", userInput);
          finalValue.innerHTML = `
          <p>Harika. Peki "büyücek" kelimesindeki ses olayı nedir?</p>`
         // <input type="text" id="user-input2">
        // <button id="submit-btn">Submit</button>`
         document.getElementById("submit-btn").addEventListener("click", () => {
          const userInput2 = document.getElementById("user-input").value;
          console.log("User input:", userInput2)
               if (userInput2.toLowerCase() === "ünsüz düşmesi")
                {
                  console.log("accepted.");
                  submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                  finalValue.innerHTML = `
                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                 restartbtn.style.display = "inline-block";
                }
                else{
                  console.log("rejected.");
                  finalValue.innerHTML = `
                 <p>Yeniden deneyin.</p>`
               
                }
         })}
        }
      }
      if (selectedValue.includes("-cık/cek")) {
        if (userInput.toLowerCase() === "küçücek"&& randomassWord == "küçük")
        {
          console.log("Accepted input:", userInput);
          finalValue.innerHTML = `
          <p>Harika. Peki "küçücek" kelimesindeki ses olayı nedir?</p>`
         // <input type="text" id="user-input2">
        // <button id="submit-btn">Submit</button>`
         document.getElementById("submit-btn").addEventListener("click", () => {
          const userInput2 = document.getElementById("user-input").value;
          console.log("User input:", userInput2)
               if (userInput2.toLowerCase() === "ünsüz düşmesi")
                {
                  console.log("accepted.");
                  submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                  finalValue.innerHTML = `
                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                 restartbtn.style.display = "inline-block";

                }
                else{
                  console.log("rejected.");
                }
         })
        }} //bitiş
        

// IM İM
       if (selectedValue.includes("-ım -im")) {
          if (userInput.toLowerCase() === "haddim"&& randomassWord == "had")
          {
            console.log("Accepted input:", userInput);
            finalValue.innerHTML = `
            <p>Harika. Peki "haddim" kelimesindeki ses olayı nedir?</p>`
           // <input type="text" id="user-input2">
          // <button id="submit-btn">Submit</button>`
           document.getElementById("submit-btn").addEventListener("click", () => {
            const userInput2 = document.getElementById("user-input").value;
            console.log("User input:", userInput2)
                 if (userInput2.toLowerCase() === "ünsüz türemesi")
                  {
                    console.log("accepted.");
                    submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                    finalValue.innerHTML = `
                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                     restartbtn.style.display = "inline-block";
                  }
                  else{
                    console.log("rejected.");
                  }
           })
          }
          if (selectedValue.includes("-ım -im")) {
            if (userInput.toLowerCase() === "hakkım"&& randomassWord == "hak")
            {
              console.log("Accepted input:", userInput);
              finalValue.innerHTML = `
              <p>Harika. Peki "hakkım" kelimesindeki ses olayı nedir?</p>`
             // <input type="text" id="user-input2">
            // <button id="submit-btn">Submit</button>`
             document.getElementById("submit-btn").addEventListener("click", () => {
              const userInput2 = document.getElementById("user-input").value;
              console.log("User input:", userInput2)
                   if (userInput2.toLowerCase() === "ünsüz türemesi")
                    {
                      console.log("accepted.");
                      submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                      finalValue.innerHTML = `
                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                     restartbtn.style.display = "inline-block";
                    }
                    else{
                      console.log("rejected.");
                    }
             })
            }
          } 
          if (selectedValue.includes("-ım -im")) {
            if (userInput.toLowerCase() === "hissim"&& randomassWord == "his")
            {
              console.log("Accepted input:", userInput);
              finalValue.innerHTML = `
              <p>Harika. Peki "hissim" kelimesindeki ses olayı nedir?</p>`
             // <input type="text" id="user-input2">
            // <button id="submit-btn">Submit</button>`
             document.getElementById("submit-btn").addEventListener("click", () => {
              const userInput2 = document.getElementById("user-input").value;
              console.log("User input:", userInput2)
                   if (userInput2.toLowerCase() === "ünsüz türemesi")
                    {
                      console.log("accepted.");
                      submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                      finalValue.innerHTML = `
                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                     restartbtn.style.display = "inline-block";
                    }
                    else{
                      console.log("rejected.");
                    }
             })
            }
          }
         if (selectedValue.includes("-ım -im")) {
            if (userInput.toLowerCase() === "kıvrım"&& randomassWord == "kıvır")
            {
              console.log("Accepted input:", userInput);
              finalValue.innerHTML = `
              <p>Harika. Peki "kıvrım" kelimesindeki ses olayı nedir?</p>`
             // <input type="text" id="user-input2">
            // <button id="submit-btn">Submit</button>`
             document.getElementById("submit-btn").addEventListener("click", () => {
              const userInput2 = document.getElementById("user-input").value;
              console.log("User input:", userInput2)
                   if (userInput2.toLowerCase() === "ünlü düşmesi")
                    {
                      console.log("accepted.");
                      submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                      finalValue.innerHTML = `
                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                     restartbtn.style.display = "inline-block";
                    }
                    else{
                      console.log("rejected.");
                      finalValue.innerHTML = `
                     <p>Yeniden deneyin.</p>`
                   
                    }
             })}
            }
          }
        if (selectedValue.includes("-ım -im")) {
            if (userInput.toLowerCase() === "devrim"&& randomassWord == "devir")
            {
              console.log("Accepted input:", userInput);
              finalValue.innerHTML = `
              <p>Harika. Peki "devrim" kelimesindeki ses olayı nedir?</p>`
             // <input type="text" id="user-input2">
            // <button id="submit-btn">Submit</button>`
             document.getElementById("submit-btn").addEventListener("click", () => {
              const userInput2 = document.getElementById("user-input").value;
              console.log("User input:", userInput2)
                   if (userInput2.toLowerCase() === "ünlü düşmesi")
                    {
                      console.log("accepted.");
                      submitbtn.style.display = "none";
                      userinputbtn.style.display = "none";
                      finalValue.innerHTML = `
                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                     restartbtn.style.display = "inline-block";
    
                    }
                    else{
                      console.log("rejected.");
                    }
             })}
             if (selectedValue.includes("-ım -im")) {
              if (userInput.toLowerCase() === "ayrım"&& randomassWord == "ayır")
              {
                console.log("Accepted input:", userInput);
                finalValue.innerHTML = `
                <p>Harika. Peki "ayrım" kelimesindeki ses olayı nedir?</p>`
               // <input type="text" id="user-input2">
              // <button id="submit-btn">Submit</button>`
               document.getElementById("submit-btn").addEventListener("click", () => {
                const userInput2 = document.getElementById("user-input").value;
                console.log("User input:", userInput2)
                     if (userInput2.toLowerCase() === "ünlü düşmesi")
                      {
                        console.log("accepted.");
                        submitbtn.style.display = "none";
                        userinputbtn.style.display = "none";
                        finalValue.innerHTML = `
                       <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                       restartbtn.style.display = "inline-block";
      
                      }
                      else{
                        console.log("rejected.");
                      }
               })
               
              }}
             
            } //bitiş


            // I/İ U/Ü A/E
            if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
              if (userInput.toLowerCase() === "sırrı"&& randomassWord == "sır")
              {
                console.log("Accepted input:", userInput);
                finalValue.innerHTML = `
                <p>Harika. Peki "sırrı" kelimesindeki ses olayı nedir?</p>`
               // <input type="text" id="user-input2">
              // <button id="submit-btn">Submit</button>`
               document.getElementById("submit-btn").addEventListener("click", () => {
                const userInput2 = document.getElementById("user-input").value;
                console.log("User input:", userInput2)
                     if (userInput2.toLowerCase() === "ünsüz türemesi")
                      {
                        console.log("accepted.");
                        submitbtn.style.display = "none";
                        userinputbtn.style.display = "none";
                        finalValue.innerHTML = `
                       <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                       restartbtn.style.display = "inline-block";
      
                      }
                      else{
                        console.log("rejected.");
                      }
               })
               
              }}
              if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                if (userInput.toLowerCase() === "affı"&& randomassWord == "af")
                {
                  console.log("Accepted input:", userInput);
                  finalValue.innerHTML = `
                  <p>Harika. Peki "affı" kelimesindeki ses olayı nedir?</p>`
                 // <input type="text" id="user-input2">
                // <button id="submit-btn">Submit</button>`
                 document.getElementById("submit-btn").addEventListener("click", () => {
                  const userInput2 = document.getElementById("user-input").value;
                  console.log("User input:", userInput2)
                       if (userInput2.toLowerCase() === "ünsüz türemesi")
                        {
                          console.log("accepted.");
                          submitbtn.style.display = "none";
                          userinputbtn.style.display = "none";
                          finalValue.innerHTML = `
                         <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                         restartbtn.style.display = "inline-block";
        
                        }
                        else{
                          console.log("rejected.");
                        }
                 })
                 
                }}
                if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                  if (userInput.toLowerCase() === "hissi"&& randomassWord == "his")
                  {
                    console.log("Accepted input:", userInput);
                    finalValue.innerHTML = `
                    <p>Harika. Peki "hissi" kelimesindeki ses olayı nedir?</p>`
                   // <input type="text" id="user-input2">
                  // <button id="submit-btn">Submit</button>`
                   document.getElementById("submit-btn").addEventListener("click", () => {
                    const userInput2 = document.getElementById("user-input").value;
                    console.log("User input:", userInput2)
                         if (userInput2.toLowerCase() === "ünsüz türemesi")
                          {
                            console.log("accepted.");
                            submitbtn.style.display = "none";
                            userinputbtn.style.display = "none";
                            finalValue.innerHTML = `
                           <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                           restartbtn.style.display = "inline-block";
          
                          }
                          else{
                            console.log("rejected.");
                          }
                   })
                   
                  }}
                  if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                    if (userInput.toLowerCase() === "alnı"&& randomassWord == "alın")
                    {
                      console.log("Accepted input:", userInput);
                      finalValue.innerHTML = `
                      <p>Harika. Peki "alnı" kelimesindeki ses olayı nedir?</p>`
                     // <input type="text" id="user-input2">
                    // <button id="submit-btn">Submit</button>`
                     document.getElementById("submit-btn").addEventListener("click", () => {
                      const userInput2 = document.getElementById("user-input").value;
                      console.log("User input:", userInput2)
                           if (userInput2.toLowerCase() === "ünsüz türemesi")
                            {
                              console.log("accepted.");
                              submitbtn.style.display = "none";
                              userinputbtn.style.display = "none";
                              finalValue.innerHTML = `
                             <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                             restartbtn.style.display = "inline-block";
            
                            }
                            else{
                              console.log("rejected.");
                            }
                     })
                     
                    }}
                    if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                      if (userInput.toLowerCase() === "aklı"&& randomassWord == "akıl")
                      {
                        console.log("Accepted input:", userInput);
                        finalValue.innerHTML = `
                        <p>Harika. Peki "aklı" kelimesindeki ses olayı nedir?</p>`
                       // <input type="text" id="user-input2">
                      // <button id="submit-btn">Submit</button>`
                       document.getElementById("submit-btn").addEventListener("click", () => {
                        const userInput2 = document.getElementById("user-input").value;
                        console.log("User input:", userInput2)
                             if (userInput2.toLowerCase() === "ünlü düşmesi")
                              {
                                console.log("accepted.");
                                submitbtn.style.display = "none";
                                userinputbtn.style.display = "none";
                                finalValue.innerHTML = `
                               <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                               restartbtn.style.display = "inline-block";
              
                              }
                              else{
                                console.log("rejected.");
                              }
                       })
                      }}
                       if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                        if (userInput.toLowerCase() === "karnı"&& randomassWord == "karın")
                        {
                          console.log("Accepted input:", userInput);
                          finalValue.innerHTML = `
                          <p>Harika. Peki "karnı" kelimesindeki ses olayı nedir?</p>`
                         // <input type="text" id="user-input2">
                        // <button id="submit-btn">Submit</button>`
                         document.getElementById("submit-btn").addEventListener("click", () => {
                          const userInput2 = document.getElementById("user-input").value;
                          console.log("User input:", userInput2)
                               if (userInput2.toLowerCase() === "ünlü düşmesi")
                                {
                                  console.log("accepted.");
                                  submitbtn.style.display = "none";
                                  userinputbtn.style.display = "none";
                                  finalValue.innerHTML = `
                                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                 restartbtn.style.display = "inline-block";
                
                                }
                                else{
                                  console.log("rejected.");
                                }
                         })
                         
                        }}
                       
                    
                      if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                        if (userInput.toLowerCase() === "gönlü"&& randomassWord == "gönül")
                        {
                          console.log("Accepted input:", userInput);
                          finalValue.innerHTML = `
                          <p>Harika. Peki "gönlü" kelimesindeki ses olayı nedir?</p>`
                         // <input type="text" id="user-input2">
                        // <button id="submit-btn">Submit</button>`
                         document.getElementById("submit-btn").addEventListener("click", () => {
                          const userInput2 = document.getElementById("user-input").value;
                          console.log("User input:", userInput2)
                               if (userInput2.toLowerCase() === "ünlü düşmesi")
                                {
                                  console.log("accepted.");
                                  submitbtn.style.display = "none";
                                  userinputbtn.style.display = "none";
                                  finalValue.innerHTML = `
                                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                 restartbtn.style.display = "inline-block";
                
                                }
                                else{
                                  console.log("rejected.");
                                }
                         })
                         
                        }}
                        if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                          if (userInput.toLowerCase() === "kulağı"&& randomassWord == "kulak")
                          {
                            console.log("Accepted input:", userInput);
                            finalValue.innerHTML = `
                            <p>Harika. Peki "kulağı" kelimesindeki ses olayı nedir?</p>`
                           // <input type="text" id="user-input2">
                          // <button id="submit-btn">Submit</button>`
                           document.getElementById("submit-btn").addEventListener("click", () => {
                            const userInput2 = document.getElementById("user-input").value;
                            console.log("User input:", userInput2)
                                 if (userInput2.toLowerCase() === "ünsüz yumuşaması")
                                  {
                                    console.log("accepted.");
                                    submitbtn.style.display = "none";
                                    userinputbtn.style.display = "none";
                                    finalValue.innerHTML = `
                                   <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                   restartbtn.style.display = "inline-block";
                  
                                  }
                                  else{
                                    console.log("rejected.");
                                  }
                           })
                           
                          }}
                          if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                            if (userInput.toLowerCase() === "inadı"&& randomassWord == "inat")
                            {
                              console.log("Accepted input:", userInput);
                              finalValue.innerHTML = `
                              <p>Harika. Peki "inadı" kelimesindeki ses olayı nedir?</p>`
                             // <input type="text" id="user-input2">
                            // <button id="submit-btn">Submit</button>`
                             document.getElementById("submit-btn").addEventListener("click", () => {
                              const userInput2 = document.getElementById("user-input").value;
                              console.log("User input:", userInput2)
                                   if (userInput2.toLowerCase() === "ünsüz yumuşaması")
                                    {
                                      console.log("accepted.");
                                      submitbtn.style.display = "none";
                                      userinputbtn.style.display = "none";
                                      finalValue.innerHTML = `
                                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                     restartbtn.style.display = "inline-block";
                    
                                    }
                                    else{
                                      console.log("rejected.");
                                    }
                             })
                             
                            }}
                            if (selectedValue.includes("-ı/i, -u/ü, -a/e")) {
                              if (userInput.toLowerCase() === "dolaba"&& randomassWord == "dolap")
                              {
                                console.log("Accepted input:", userInput);
                                finalValue.innerHTML = `
                                <p>Harika. Peki "dolaba" kelimesindeki ses olayı nedir?</p>`
                               // <input type="text" id="user-input2">
                              // <button id="submit-btn">Submit</button>`
                               document.getElementById("submit-btn").addEventListener("click", () => {
                                const userInput2 = document.getElementById("user-input").value;
                                console.log("User input:", userInput2)
                                     if (userInput2.toLowerCase() === "ünsüz yumuşaması")
                                      {
                                        console.log("accepted.");
                                        submitbtn.style.display = "none";
                                        userinputbtn.style.display = "none";
                                        finalValue.innerHTML = `
                                       <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                       restartbtn.style.display = "inline-block";
                      
                                      }
                                      else{
                                        console.log("rejected.");
                                      }
                               })
                               
                              }}
                              if (selectedValue.includes("-de/da/den/dan")) {
                                if (userInput.toLowerCase() === "kalıpta"&& randomassWord == "kalıp")
                                {
                                  console.log("Accepted input:", userInput);
                                  finalValue.innerHTML = `
                                  <p>Harika. Peki "kalıpta" kelimesindeki ses olayı nedir?</p>`
                                 // <input type="text" id="user-input2">
                                // <button id="submit-btn">Submit</button>`
                                 document.getElementById("submit-btn").addEventListener("click", () => {
                                  const userInput2 = document.getElementById("user-input").value;
                                  console.log("User input:", userInput2)
                                       if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                        {
                                          console.log("accepted.");
                                          submitbtn.style.display = "none";
                                          userinputbtn.style.display = "none";
                                          finalValue.innerHTML = `
                                         <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                         restartbtn.style.display = "inline-block";
                        
                                        }
                                        else{
                                          console.log("rejected.");
                                        }
                                 })
                                 
                                }}
                                if (selectedValue.includes("-de/da/den/dan")) {
                                  if (userInput.toLowerCase() === "balıktan"&& randomassWord == "balık")
                                  {
                                    console.log("Accepted input:", userInput);
                                    finalValue.innerHTML = `
                                    <p>Harika. Peki "balıktan" kelimesindeki ses olayı nedir?</p>`
                                   // <input type="text" id="user-input2">
                                  // <button id="submit-btn">Submit</button>`
                                   document.getElementById("submit-btn").addEventListener("click", () => {
                                    const userInput2 = document.getElementById("user-input").value;
                                    console.log("User input:", userInput2)
                                         if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                          {
                                            console.log("accepted.");
                                            submitbtn.style.display = "none";
                                            userinputbtn.style.display = "none";
                                            finalValue.innerHTML = `
                                           <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                           restartbtn.style.display = "inline-block";
                          
                                          }
                                          else{
                                            console.log("rejected.");
                                          }
                                   })
                                   
                                  }}
                                  if (selectedValue.includes("-de/da/den/dan")) {
                                    if (userInput.toLowerCase() === "eşikte"&& randomassWord == "eşik")
                                    {
                                      console.log("Accepted input:", userInput);
                                      finalValue.innerHTML = `
                                      <p>Harika. Peki "eşikte" kelimesindeki ses olayı nedir?</p>`
                                     // <input type="text" id="user-input2">
                                    // <button id="submit-btn">Submit</button>`
                                     document.getElementById("submit-btn").addEventListener("click", () => {
                                      const userInput2 = document.getElementById("user-input").value;
                                      console.log("User input:", userInput2)
                                           if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                            {
                                              console.log("accepted.");
                                              submitbtn.style.display = "none";
                                              userinputbtn.style.display = "none";
                                              finalValue.innerHTML = `
                                             <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                             restartbtn.style.display = "inline-block";
                            
                                            }
                                            else{
                                              console.log("rejected.");
                                            }
                                     })
                                     
                                    }}
                                    if (selectedValue.includes("-de/da/den/dan")) {
                                      if (userInput.toLowerCase() === "ağaçtan"&& randomassWord == "ağaç")
                                      {
                                        console.log("Accepted input:", userInput);
                                        finalValue.innerHTML = `
                                        <p>Harika. Peki "ağaçtan" kelimesindeki ses olayı nedir?</p>`
                                       // <input type="text" id="user-input2">
                                      // <button id="submit-btn">Submit</button>`
                                       document.getElementById("submit-btn").addEventListener("click", () => {
                                        const userInput2 = document.getElementById("user-input").value;
                                        console.log("User input:", userInput2)
                                             if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                              {
                                                console.log("accepted.");
                                                submitbtn.style.display = "none";
                                                userinputbtn.style.display = "none";
                                                finalValue.innerHTML = `
                                               <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                               restartbtn.style.display = "inline-block";
                              
                                              }
                                              else{
                                                console.log("rejected.");
                                              }
                                       })
                                       
                                      }}
                                      if (selectedValue.includes("-y/yor")) {
                                        if (userInput.toLowerCase() === "tarıyor"&& randomassWord == "tara")
                                        {
                                          console.log("Accepted input:", userInput);
                                          finalValue.innerHTML = `
                                          <p>Harika. Peki "tarıyor" kelimesindeki ses olayı nedir?</p>`
                                         // <input type="text" id="user-input2">
                                        // <button id="submit-btn">Submit</button>`
                                         document.getElementById("submit-btn").addEventListener("click", () => {
                                          const userInput2 = document.getElementById("user-input").value;
                                          console.log("User input:", userInput2)
                                               if (userInput2.toLowerCase() === "ünlü daralması")
                                                {
                                                  console.log("accepted.");
                                                  submitbtn.style.display = "none";
                                                  userinputbtn.style.display = "none";
                                                  finalValue.innerHTML = `
                                                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                 restartbtn.style.display = "inline-block";
                                
                                                }
                                                else{
                                                  console.log("rejected.");
                                                }
                                         })
                                         
                                        }}
                                    
                                        if (selectedValue.includes("-y/yor")) {
                                          if (userInput.toLowerCase() === "saklıyor"&& randomassWord == "sakla")
                                          {
                                            console.log("Accepted input:", userInput);
                                            finalValue.innerHTML = `
                                            <p>Harika. Peki "saklıyor" kelimesindeki ses olayı nedir?</p>`
                                           // <input type="text" id="user-input2">
                                          // <button id="submit-btn">Submit</button>`
                                           document.getElementById("submit-btn").addEventListener("click", () => {
                                            const userInput2 = document.getElementById("user-input").value;
                                            console.log("User input:", userInput2)
                                                 if (userInput2.toLowerCase() === "ünlü daralması")
                                                  {
                                                    console.log("accepted.");
                                                    submitbtn.style.display = "none";
                                                    userinputbtn.style.display = "none";
                                                    finalValue.innerHTML = `
                                                   <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                   restartbtn.style.display = "inline-block";
                                  
                                                  }
                                                  else{
                                                    console.log("rejected.");
                                                  }
                                           })
                                           
                                          }}
                                          if (selectedValue.includes("-y/yor")) {
                                            if (userInput.toLowerCase() === "saklıyor"&& randomassWord == "sakla")
                                            {
                                              console.log("Accepted input:", userInput);
                                              finalValue.innerHTML = `
                                              <p>Harika. Peki "saklıyor" kelimesindeki ses olayı nedir?</p>`
                                             // <input type="text" id="user-input2">
                                            // <button id="submit-btn">Submit</button>`
                                             document.getElementById("submit-btn").addEventListener("click", () => {
                                              const userInput2 = document.getElementById("user-input").value;
                                              console.log("User input:", userInput2)
                                                   if (userInput2.toLowerCase() === "ünlü daralması")
                                                    {
                                                      console.log("accepted.");
                                                      submitbtn.style.display = "none";
                                                      userinputbtn.style.display = "none";
                                                      finalValue.innerHTML = `
                                                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                     restartbtn.style.display = "inline-block";
                                    
                                                    }
                                                    else{
                                                      console.log("rejected.");
                                                    }
                                             })
                                             
                                            }}
                                            if (selectedValue.includes("-y/yor")) {
                                              if (userInput.toLowerCase() === "bekliyor"&& randomassWord == "bekle")
                                              {
                                                console.log("Accepted input:", userInput);
                                                finalValue.innerHTML = `
                                                <p>Harika. Peki "bekliyor" kelimesindeki ses olayı nedir?</p>`
                                               // <input type="text" id="user-input2">
                                              // <button id="submit-btn">Submit</button>`
                                               document.getElementById("submit-btn").addEventListener("click", () => {
                                                const userInput2 = document.getElementById("user-input").value;
                                                console.log("User input:", userInput2)
                                                     if (userInput2.toLowerCase() === "ünlü daralması")
                                                      {
                                                        console.log("accepted.");
                                                        submitbtn.style.display = "none";
                                                        userinputbtn.style.display = "none";
                                                        finalValue.innerHTML = `
                                                       <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                       restartbtn.style.display = "inline-block";
                                      
                                                      }
                                                      else{
                                                        console.log("rejected.");
                                                      }
                                               })
                                               
                                              }}
                                              if (selectedValue.includes("-y/yor")) {
                                                if (userInput.toLowerCase() === "yazmıyor"&& randomassWord == "yazma")
                                                {
                                                  console.log("Accepted input:", userInput);
                                                  finalValue.innerHTML = `
                                                  <p>Harika. Peki "yazmıyor" kelimesindeki ses olayı nedir?</p>`
                                                 // <input type="text" id="user-input2">
                                                // <button id="submit-btn">Submit</button>`
                                                 document.getElementById("submit-btn").addEventListener("click", () => {
                                                  const userInput2 = document.getElementById("user-input").value;
                                                  console.log("User input:", userInput2)
                                                       if (userInput2.toLowerCase() === "ünlü daralması")
                                                        {
                                                          console.log("accepted.");
                                                          submitbtn.style.display = "none";
                                                          userinputbtn.style.display = "none";
                                                          finalValue.innerHTML = `
                                                         <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                         restartbtn.style.display = "inline-block";
                                        
                                                        }
                                                        else{
                                                          console.log("rejected.");
                                                        }
                                                 })
                                                 
                                                }}
                                                if (selectedValue.includes("-y/yor")) {
                                                  if (userInput.toLowerCase() === "söylüyor"&& randomassWord == "söyle")
                                                  {
                                                    console.log("Accepted input:", userInput);
                                                    finalValue.innerHTML = `
                                                    <p>Harika. Peki "söylüyor" kelimesindeki ses olayı nedir?</p>`
                                                   // <input type="text" id="user-input2">
                                                  // <button id="submit-btn">Submit</button>`
                                                   document.getElementById("submit-btn").addEventListener("click", () => {
                                                    const userInput2 = document.getElementById("user-input").value;
                                                    console.log("User input:", userInput2)
                                                         if (userInput2.toLowerCase() === "ünlü daralması")
                                                          {
                                                            console.log("accepted.");
                                                            submitbtn.style.display = "none";
                                                            userinputbtn.style.display = "none";
                                                            finalValue.innerHTML = `
                                                           <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                           restartbtn.style.display = "inline-block";
                                          
                                                          }
                                                          else{
                                                            console.log("rejected.");
                                                          }
                                                   })
                                                   
                                                  }} // BİTİŞ

                                                  if (selectedValue.includes("-er -ar")) {
                                                    if (userInput.toLowerCase() === "sarar"&& randomassWord == "sarı")
                                                    {
                                                      console.log("Accepted input:", userInput);
                                                      finalValue.innerHTML = `
                                                      <p>Harika. Peki "sarar" kelimesindeki ses olayı nedir?</p>`
                                                     // <input type="text" id="user-input2">
                                                    // <button id="submit-btn">Submit</button>`
                                                     document.getElementById("submit-btn").addEventListener("click", () => {
                                                      const userInput2 = document.getElementById("user-input").value;
                                                      console.log("User input:", userInput2)
                                                           if (userInput2.toLowerCase() === "ünlü düşmesi")
                                                            {
                                                              console.log("accepted.");
                                                              submitbtn.style.display = "none";
                                                              userinputbtn.style.display = "none";
                                                              finalValue.innerHTML = `
                                                             <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                             restartbtn.style.display = "inline-block";
                                            
                                                            }
                                                            else{
                                                              console.log("rejected.");
                                                            }
                                                     })
                                                     
                                                    }}
                                                    if (selectedValue.includes("-er -ar")) {
                                                      if (userInput.toLowerCase() === "yeşer"&& randomassWord == "yeşil")
                                                      {
                                                        console.log("Accepted input:", userInput);
                                                        finalValue.innerHTML = `
                                                        <p>Harika. Peki "yeşer" kelimesindeki ses olayı nedir?</p>`
                                                       // <input type="text" id="user-input2">
                                                      // <button id="submit-btn">Submit</button>`
                                                       document.getElementById("submit-btn").addEventListener("click", () => {
                                                        const userInput2 = document.getElementById("user-input").value;
                                                        console.log("User input:", userInput2)
                                                             if (userInput2.toLowerCase() === "ünlü düşmesi")
                                                              {
                                                                console.log("accepted.");
                                                                submitbtn.style.display = "none";
                                                                userinputbtn.style.display = "none";
                                                                finalValue.innerHTML = `
                                                               <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                               restartbtn.style.display = "inline-block";
                                              
                                                              }
                                                              else{
                                                                console.log("rejected.");
                                                              }
                                                       })
                                                       
                                                      }}
                                                      if (selectedValue.includes("-gın/gin/gan/gen")) {
                                                        if (userInput.toLowerCase() === "baskın"&& randomassWord == "bas")
                                                        {
                                                          console.log("Accepted input:", userInput);
                                                          finalValue.innerHTML = `
                                                          <p>Harika. Peki "baskın" kelimesindeki ses olayı nedir?</p>`
                                                         // <input type="text" id="user-input2">
                                                        // <button id="submit-btn">Submit</button>`
                                                         document.getElementById("submit-btn").addEventListener("click", () => {
                                                          const userInput2 = document.getElementById("user-input").value;
                                                          console.log("User input:", userInput2)
                                                               if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                {
                                                                  console.log("accepted.");
                                                                  submitbtn.style.display = "none";
                                                                  userinputbtn.style.display = "none";
                                                                  finalValue.innerHTML = `
                                                                 <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                 restartbtn.style.display = "inline-block";
                                                
                                                                }
                                                                else{
                                                                  console.log("rejected.");
                                                                }
                                                         })
                                                         
                                                        }}
                                                        if (selectedValue.includes("-gın/gin/gan/gen")) {
                                                          if (userInput.toLowerCase() === "üretken"&& randomassWord == "üret")
                                                          {
                                                            console.log("Accepted input:", userInput);
                                                            finalValue.innerHTML = `
                                                            <p>Harika. Peki "üretken" kelimesindeki ses olayı nedir?</p>`
                                                           // <input type="text" id="user-input2">
                                                          // <button id="submit-btn">Submit</button>`
                                                           document.getElementById("submit-btn").addEventListener("click", () => {
                                                            const userInput2 = document.getElementById("user-input").value;
                                                            console.log("User input:", userInput2)
                                                                 if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                  {
                                                                    console.log("accepted.");
                                                                    submitbtn.style.display = "none";
                                                                    userinputbtn.style.display = "none";
                                                                    finalValue.innerHTML = `
                                                                   <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                   restartbtn.style.display = "inline-block";
                                                  
                                                                  }
                                                                  else{
                                                                    console.log("rejected.");
                                                                  }
                                                           })
                                                           
                                                          }}
                                                          if (selectedValue.includes("-gın/gin/gan/gen")) {
                                                            if (userInput.toLowerCase() === "seçkin"&& randomassWord == "seç")
                                                            {
                                                              console.log("Accepted input:", userInput);
                                                              finalValue.innerHTML = `
                                                              <p>Harika. Peki "seçkin" kelimesindeki ses olayı nedir?</p>`
                                                             // <input type="text" id="user-input2">
                                                            // <button id="submit-btn">Submit</button>`
                                                             document.getElementById("submit-btn").addEventListener("click", () => {
                                                              const userInput2 = document.getElementById("user-input").value;
                                                              console.log("User input:", userInput2)
                                                                   if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                    {
                                                                      console.log("accepted.");
                                                                      submitbtn.style.display = "none";
                                                                      userinputbtn.style.display = "none";
                                                                      finalValue.innerHTML = `
                                                                     <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                     restartbtn.style.display = "inline-block";
                                                    
                                                                    }
                                                                    else{
                                                                      console.log("rejected.");
                                                                    }
                                                             })
                                                             
                                                            }}
                                                            if (selectedValue.includes("-cı/ci/çı/çi")) {
                                                              if (userInput.toLowerCase() === "sanatçı"&& randomassWord == "sanat")
                                                              {
                                                                console.log("Accepted input:", userInput);
                                                                finalValue.innerHTML = `
                                                                <p>Harika. Peki "sanatçı" kelimesindeki ses olayı nedir?</p>`
                                                               // <input type="text" id="user-input2">
                                                              // <button id="submit-btn">Submit</button>`
                                                               document.getElementById("submit-btn").addEventListener("click", () => {
                                                                const userInput2 = document.getElementById("user-input").value;
                                                                console.log("User input:", userInput2)
                                                                     if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                      {
                                                                        console.log("accepted.");
                                                                        submitbtn.style.display = "none";
                                                                        userinputbtn.style.display = "none";
                                                                        finalValue.innerHTML = `
                                                                       <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                       restartbtn.style.display = "inline-block";
                                                      
                                                                      }
                                                                      else{
                                                                        console.log("rejected.");
                                                                      }
                                                               })
                                                               
                                                              }}
                                                              if (selectedValue.includes("-cı/ci/çı/çi")) {
                                                                if (userInput.toLowerCase() === "işçi"&& randomassWord == "iş")
                                                                {
                                                                  console.log("Accepted input:", userInput);
                                                                  finalValue.innerHTML = `
                                                                  <p>Harika. Peki "işçi" kelimesindeki ses olayı nedir?</p>`
                                                                 // <input type="text" id="user-input2">
                                                                // <button id="submit-btn">Submit</button>`
                                                                 document.getElementById("submit-btn").addEventListener("click", () => {
                                                                  const userInput2 = document.getElementById("user-input").value;
                                                                  console.log("User input:", userInput2)
                                                                       if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                        {
                                                                          console.log("accepted.");
                                                                          submitbtn.style.display = "none";
                                                                          userinputbtn.style.display = "none";
                                                                          finalValue.innerHTML = `
                                                                         <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                         restartbtn.style.display = "inline-block";
                                                        
                                                                        }
                                                                        else{
                                                                          console.log("rejected.");
                                                                        }
                                                                 })
                                                                 
                                                                }}
                                                                if (selectedValue.includes("-cı/ci/çı/çi")) {
                                                                  if (userInput.toLowerCase() === "kayıkçı"&& randomassWord == "kayık")
                                                                  {
                                                                    console.log("Accepted input:", userInput);
                                                                    finalValue.innerHTML = `
                                                                    <p>Harika. Peki "kayıkçı" kelimesindeki ses olayı nedir?</p>`
                                                                   // <input type="text" id="user-input2">
                                                                  // <button id="submit-btn">Submit</button>`
                                                                   document.getElementById("submit-btn").addEventListener("click", () => {
                                                                    const userInput2 = document.getElementById("user-input").value;
                                                                    console.log("User input:", userInput2)
                                                                         if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                          {
                                                                            console.log("accepted.");
                                                                            submitbtn.style.display = "none";
                                                                            userinputbtn.style.display = "none";
                                                                            finalValue.innerHTML = `
                                                                           <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                           restartbtn.style.display = "inline-block";
                                                          
                                                                          }
                                                                          else{
                                                                            console.log("rejected.");
                                                                          }
                                                                   })
                                                                   
                                                                  }}
                                                                  if (selectedValue.includes("-cı/ci/çı/çi")) {
                                                                    if (userInput.toLowerCase() === "halkçı"&& randomassWord == "halk")
                                                                    {
                                                                      console.log("Accepted input:", userInput);
                                                                      finalValue.innerHTML = `
                                                                      <p>Harika. Peki "halkçı" kelimesindeki ses olayı nedir?</p>`
                                                                     // <input type="text" id="user-input2">
                                                                    // <button id="submit-btn">Submit</button>`
                                                                     document.getElementById("submit-btn").addEventListener("click", () => {
                                                                      const userInput2 = document.getElementById("user-input").value;
                                                                      console.log("User input:", userInput2)
                                                                           if (userInput2.toLowerCase() === "ünsüz benzeşmesi")
                                                                            {
                                                                              console.log("accepted.");
                                                                              submitbtn.style.display = "none";
                                                                              userinputbtn.style.display = "none";
                                                                              finalValue.innerHTML = `
                                                                             <p>Mükemmel. Yeniden başlamak ister misiniz?</p>`
                                                                             restartbtn.style.display = "inline-block";
                                                            
                                                                            }
                                                                            else{
                                                                              console.log("rejected.");
                                                                            }
                                                                     })
                                                                     
                                                                    }}



      
      

      
      else {
     console.log("for some reason this was triggered.", userInput);
    }
  });
});
