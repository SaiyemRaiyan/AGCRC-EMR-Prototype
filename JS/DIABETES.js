    document.addEventListener('DOMContentLoaded', function() {
        // Set current date
        const today = new Date();
        const visitDateInput = document.getElementById('visit-date');
        if (visitDateInput) {
            visitDateInput.valueAsDate = today;
        }
        
        // Improved toggle display function
        function toggleDisplay(triggerSelector, targetId, checkValue = true) {
            const triggers = document.querySelectorAll(triggerSelector);
            const target = document.getElementById(targetId);
            
            if (!triggers.length || !target) return;
            
            function updateDisplay() {
                const shouldShow = Array.from(triggers).some(el => 
                    el.checked && (checkValue === true || el.value == checkValue)
                );
                target.style.display = shouldShow ? 'block' : 'none';
            }
            
            triggers.forEach(trigger => {
                trigger.addEventListener('change', updateDisplay);
            });
            
            // Initialize
            updateDisplay();
        }

        // Set up all conditional displays
        toggleDisplay('input[name="hypertension"]', 'hypertension-details', 'yes');
        toggleDisplay('input[name="teleconsult"]', 'teleconsultant-details', 'done');
        toggleDisplay('input[name="specialist-consult"]', 'specialist-details', 'yes');
        toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
        toggleDisplay('input[name="appointment-made"]', 'appointment-date', 'yes');
        toggleDisplay('input[name="virtual-care"]', 'virtual-care-details', 'yes');
        toggleDisplay('input[name="community-health"]', 'community-health-details', 'yes');
        toggleDisplay('input[name="immediate-tests"]', 'specific-tests', 'specific');

        // BMI calculation
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        const bmiInput = document.getElementById('bmi');
        const summaryBmi = document.getElementById('summary-bmi');
        
        function calculateBMI() {
            if (weightInput && heightInput && bmiInput) {
                const weight = parseFloat(weightInput.value);
                const height = parseFloat(heightInput.value) / 100; // convert cm to m
                const bmi = (weight && height > 0) ? (weight / (height * height)).toFixed(1) : '';
                bmiInput.value = bmi;
                if (summaryBmi) summaryBmi.value = bmi;
            }
        }
        
        if (weightInput && heightInput) {
            ['input', 'change'].forEach(event => {
                weightInput.addEventListener(event, calculateBMI);
                heightInput.addEventListener(event, calculateBMI);
            });
            calculateBMI();
        }
        
        // Blood pressure average calculation
        const bp1Systolic = document.getElementById('bp1-systolic');
        const bp1Diastolic = document.getElementById('bp1-diastolic');
        const bp2Systolic = document.getElementById('bp2-systolic');
        const bp2Diastolic = document.getElementById('bp2-diastolic');
        const bpAverage = document.getElementById('bp-average');
        
        function calculateBPAverage() {
            if (bp1Systolic && bp1Diastolic && bp2Systolic && bp2Diastolic && bpAverage) {
                const sys1 = parseFloat(bp1Systolic.value) || 0;
                const dia1 = parseFloat(bp1Diastolic.value) || 0;
                const sys2 = parseFloat(bp2Systolic.value) || 0;
                const dia2 = parseFloat(bp2Diastolic.value) || 0;
                
                if (sys1 > 0 && dia1 > 0 && sys2 > 0 && dia2 > 0) {
                    const avgSys = Math.round((sys1 + sys2) / 2);
                    const avgDia = Math.round((dia1 + dia2) / 2);
                    bpAverage.value = `${avgSys}/${avgDia}`;
                } else {
                    bpAverage.value = '';
                }
            }
        }
        
        if (bp1Systolic && bp1Diastolic && bp2Systolic && bp2Diastolic) {
            ['input', 'change'].forEach(event => {
                bp1Systolic.addEventListener(event, calculateBPAverage);
                bp1Diastolic.addEventListener(event, calculateBPAverage);
                bp2Systolic.addEventListener(event, calculateBPAverage);
                bp2Diastolic.addEventListener(event, calculateBPAverage);
            });
            calculateBPAverage();
        }

        // Waist/Hip ratio calculation
        const waistInput = document.getElementById('waist-circumference');
        const hipInput = document.getElementById('hip-circumference');
        const ratioDisplay = document.getElementById('waist-hip-ratio');
        const summaryRatio = document.getElementById('summary-ratio');
        
        function calculateWaistHipRatio() {
            if (waistInput && hipInput && ratioDisplay) {
                const waist = parseFloat(waistInput.value);
                const hip = parseFloat(hipInput.value);
                const ratio = (waist && hip > 0) ? (waist / hip).toFixed(2) : '';
                ratioDisplay.textContent = ratio;
                if (summaryRatio) summaryRatio.value = ratio;
            }
        }
        
        if (waistInput && hipInput) {
            ['input', 'change'].forEach(event => {
                waistInput.addEventListener(event, calculateWaistHipRatio);
                hipInput.addEventListener(event, calculateWaistHipRatio);
            });
            calculateWaistHipRatio();
        }

           // Button functionality
           document.getElementById('save-btn')?.addEventListener('click', function() {
                // Validate form before saving
                if (validateForm()) {
                    alert('Form data saved successfully!');
                    // In real implementation: saveFormData();
                }
            });
            
            document.getElementById('submit-btn')?.addEventListener('click', function() {
                if (validateForm()) {
                    if (confirm('Are you sure you want to submit this to EMR?')) {
                        alert('Form submitted to EMR successfully!');
                        // In real implementation: submitToEMR();
                    }
                }
            });
            
            document.getElementById('print-btn')?.addEventListener('click', function() {
                window.print();
            });

            // Form validation
            function validateForm() {
                // Example: Check required fields are filled
                let isValid = true;
                
                document.querySelectorAll('[required]').forEach(field => {
                    if (!field.value.trim()) {
                        field.style.borderColor = 'red';
                        isValid = false;
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    alert('Please fill in all required fields');
                    return false;
                }
                return true;
            }

            // Initialize all hidden fields and trigger change events
            document.querySelectorAll('.hidden').forEach(el => {
                el.style.display = 'none';
            });
            
            document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => {
                if (el.checked) el.dispatchEvent(new Event('change'));
            });

            // Info modal functionality
            const modal = document.getElementById("infoModal");
            const infoLinks = document.querySelectorAll(".info-link");
            const infoContent = document.getElementById("infoContent");
            const span = document.getElementsByClassName("close")[0];
            
            // Info content definitions
            const infoData = {

      "cardiac-auscultation": `
          <h3 style="color: var(--primary-color); margin-top: 0;">A PRIMER ON CARDIAC AUSCULTATION</h3>
                 <p style="color: #ff0000; font-weight: bold;">This exam should be done with an acoustically augmented stethoscope.</p>
                 <p style="color: #ff0000; font-weight: bold;">This exam should be done three times with the patient lying flat on the back, lying on the left side, and sitting up.</p>

          <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
            <p><strong>First heart sound (S1)</strong>: Closure of atrial-ventricular valves - tricuspid (right heart) and mitral (left heart) valves. Best heard at apex.</p>
            
            <p><strong>Systole</strong>: The period between S1 and S2 when the heart muscles are contracting.</p>
            
            <p><strong>Second heart sound (S2)</strong>: Aortic and pulmonic valve (also called semi-lunar valves) closure, usually in this order. Best heard in the cephalad right (A2) and left (P2) rib interspaces.</p>
            
            <p><strong>Split S2</strong>: Normal with inspiration associated with increased filling of right ventricle = A2 followed by delayed P2.</p>
            
            <p><strong>Third heart sound (S3)</strong>: A physiologically normal ventricular filling sound in young people and with exercise best heard at apex.</p>
            
            <p><strong>Diastole</strong>: The period between S2 and S1 when the heart muscles are at rest.</p>
            
            <p><strong>Atrial-ventricular valves</strong>: Open silently in diastole.</p>
            
            <p><strong>Murmurs</strong>: The significance of murmurs is determined by their locations, character, timing, and intensities. Systolic murmurs are often innocent or not indicative of heart disease, while diastolic murmurs are almost always pathologic.</p>
            
            <h4 style="color: var(--primary-color); margin-bottom: 5px;">Auscultation sites:</h4>
            <ul style="margin-top: 5px;">
              <li><strong>Right second rib interspace</strong> (between the second and third ribs, to the right of and next to the sternum) - closest to the aortic valve</li>
              <li><strong>Left second interspace</strong> (between the second and third ribs, to the left of and next to the sternum) - closest to the pulmonic valve</li>
              <li><strong>Left lower sternal border</strong> - closest to the tricuspid valve</li>
              <li><strong>Apex</strong> (approximately between the 5th and 6th left ribs 3 inches from the left sternal border, where the heart beat can most easily be felt) - closest to the mitral valve</li>
            </ul>
            
            <h4 style="color: var(--primary-color); margin-bottom: 5px;">Key Points:</h4>
            <ul style="margin-top: 5px;">
              <li>Use the diaphragm of the stethoscope for high-pitched sounds (S1, S2, murmurs of aortic/pulmonic stenosis, mitral regurgitation)</li>
              <li>Use the bell for low-pitched sounds (S3, S4, murmur of mitral stenosis)</li>
              <li>Have patient breathe normally, then hold breath in expiration to listen carefully</li>
              <li>Compare auscultation findings with pulse palpation for timing</li>
            </ul>
          </div>
        `,
          
            "lid-lag-info": `
    <p><strong>Lid lag</strong> is a condition in which the upper eyelid is higher than normal while the eye is in downgaze. It can be measured by comparing the upper eyelid position in downgaze to its position in primary gaze relative to a fixed point like the pupil. The most common cause of lid lag is hyperthyroidism.</p>
           `,

          "visual-acuity": `
        <h3 style="color: #1976d2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(25,118,210,0.2); animation: pulse 2s infinite;">
            Visual Acuity Testing
      </h3>
        <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <!-- Testing Procedure -->
        <div style="background: linear-gradient(to right, #e3f2fd, #bbdefb); padding: 15px; border-left: 5px solid #2196f3; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <h4 style="color: #0d47a1; margin-top: 0; border-bottom: 2px dashed #64b5f6; padding-bottom: 5px;">Testing Procedure</h4>
            <ul style="margin-bottom: 0; color: #0d47a1; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Have patient stand at appropriate marking on floor, 20 feet away from the chart.</li>
                <li style="margin-bottom: 8px;">Have the patient cover one eye and read the lowest line they are able to read and record the Snellen notation.</li>
                <li>Test each eye independently.</li>
            </ul>
        </div>
        
        <!-- Snellen Chart -->
        <div style="background: linear-gradient(to right, #e1f5fe, #b3e5fc); padding: 15px; border-left: 5px solid #0288d1; border-radius: 0 8px 8px 0; animation: fadeIn 1.2s;">
            <h4 style="color: #01579b; margin-top: 0; border-bottom: 2px dashed #4fc3f7; padding-bottom: 5px;">Snellen Chart</h4>
            <div style="text-align: center; margin-top: 10px;">
                <img src="SNELLEN CHART.jpg" alt="Snellen Eye Chart" style="max-width: 100%; height: auto; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p style="margin-top: 8px; margin-bottom: 0; font-size: 0.9em; color: #01579b;">Standard Snellen chart for visual acuity testing</p>
            </div>
        </div>
    </div>
    
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h4 {
            font-weight: bold;
            margin-bottom: 8px;
        }
        </style>
    `,

              "metabolic-syndrome": `
    <h3 style="color: #7b1fa2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(123,31,162,0.2); animation: pulse 2s infinite;">
        Metabolic Syndrome
    </h3>
    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <div style="background: linear-gradient(to right, #f3e5f5, #e1bee7); padding: 15px; border-left: 5px solid #9c27b0; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <p style="margin-bottom: 0; color: #4a148c; font-weight: 500;">
                Metabolic syndrome (also called insulin resistance syndrome) is characterized primarily by abdominal/visceral obesity (which is associated with increased insulin resistance); with waist circumference >85 cm in men, >80 cm in women for Asians, high triglycerides, and non-alcoholic fatty liver disease (NAFLD) (also called metabolic-dysfunction steatotic liver disease - MASLD). Usually associated with type 2 diabetes (=with hemoglobin A1c more than 6.5%) and often also with hypertension.
            </p>
        </div>
    </div>
    
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
`,
                "lid-lag-info": "Lid lag is a condition in which the upper eyelid is higher than normal while the eye is in downgaze. It can be measured by comparing the upper eyelid position in downgaze to its position in primary gaze relative to a fixed point like the pupil.",
                "pmi-info": "The point of maximal impulse (PMI) of the heart is the location at which the cardiac impulse can be best palpated on the chest wall. It is frequently at the fifth intercostal space at the midclavicular line. When dilated cardiomyopathy is present, this can be shifted laterally.",
                "s1-info": "S1 = closure of atrial-ventricular valves=tricuspid (right heart) and mitral (left heart) valves. Best heard at apex.",
                "s2-info": "S2 = Aortic and pulmonic valve (also called semi-lunar valves) closure, usually in this order. Best heard in the cephalad right (A2) and left (P2) rib interspaces.",
                "split-s2-info": "Normal with inspiration associated with increased filling of right ventricle=A2 followed by delayed P2.",
                "s3-info": "A physiologically normal ventricular filling sound in young people and with exercise best heard at apex.",
                "murmurs-info": "The significance of murmurs is determined by their locations, character, timing, and intensities. Systolic murmurs are often innocent or not indicative of heart disease, while diastolic murmurs are almost always pathologic.",
                "auscultation-sites": "Auscultation sites:<br><br>" +
                    "1. Right second rib interspace (that is between the second and third ribs, to the right of and next to the sternum) (closest to the aortic valve)<br>" +
                    "2. Left second interspace (that is between the second and third ribs, to the left of and next to the sternum) (closest to the pulmonic valve)<br>" +
                    "3. Left lower sternal border (closest to the tricuspid valve)<br>" +
                    "4. Apex (or bottom) (approximately between the 5th and 6th left ribs 3 inches from the left sternal border, where the heart beat can most easily be felt) (closest to the mitral valve)"
            };
            
            // When user clicks on an info link, open the modal
            infoLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const infoKey = this.getAttribute('data-info');
                    infoContent.innerHTML = infoData[infoKey];
                    modal.style.display = "block";
                });
            });
            
            // When user clicks on (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
            
            // When user clicks anywhere outside the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
         // Navbar functionality
  const vibrantNav = document.querySelector('.vibrant-nav-container');
  const navHeader = document.querySelector('.vibrant-nav-header');
  
  // Set animation delays for each link
  document.querySelectorAll('.vibrant-nav-link').forEach((link, index) => {
    link.style.setProperty('--i', index);
  });
  
  // Toggle dropdown
  if (navHeader) {
    navHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      vibrantNav.classList.toggle('active');
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    if (vibrantNav) {
      vibrantNav.classList.remove('active');
    }
  });
  
  // Highlight current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.vibrant-nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('current');
      link.innerHTML = '<i>✨</i> ' + link.textContent.replace('🩺 ', '').replace('🌸 ', '').replace('🤕 ', '');
    }
  });

        // Example form data functions (for actual implementation)
        function saveFormData() {
            const formData = collectFormData();
            console.log('Saving:', formData);
        }

        function submitToEMR() {
            const formData = collectFormData();
            console.log('Submitting to EMR:', formData);
        }

        function collectFormData() {
            return {
                // Collect all form data here
                assessment: document.querySelector('.subsection textarea')?.value,
                changesMade: document.querySelector('input[name="changes-made"]:checked')?.value,
            };
        }

        document.querySelectorAll('.template-toc a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add highlight to the section
            targetElement.style.backgroundColor = '#f5f5f5';
            setTimeout(() => {
                targetElement.style.backgroundColor = '';
            }, 2000);
        }
    });
});