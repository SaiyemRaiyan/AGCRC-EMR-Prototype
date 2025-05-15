    document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  const today = new Date();
  const visitDateInput = document.getElementById('visit-date');
  if (visitDateInput) {
    visitDateInput.valueAsDate = today;
  }

  // Toggle display function for conditional sections
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
    updateDisplay();
  }

  // Set up all conditional displays
  toggleDisplay('input[name="allergies"]', 'allergies-details', 'yes');
  toggleDisplay('input[name="exposure"]', 'exposure-details', 'yes');
  toggleDisplay('input[name="family"]', 'family-details', 'yes');
  toggleDisplay('input[name="xray"]', 'xray-details', 'yes');
  toggleDisplay('input[name="hemoglobin"]', 'hemoglobin-details', 'yes');
  toggleDisplay('input[name="eosinophil"]', 'eosinophil-details', 'yes');
  toggleDisplay('input[name="oximetry"]', 'oximetry-details', 'yes');
  toggleDisplay('input[name="spirometry"]', 'spirometry-details', 'yes');
  toggleDisplay('input[name="peakflow"]', 'peakflow-details', 'yes');
  toggleDisplay('input[name="treatment"]', 'treatment-details', 'other');
  toggleDisplay('input[name="testing"]', 'testing-details', 'specific');
  toggleDisplay('input[name="tele"]', 'tele-details', 'yes');
  toggleDisplay('input[name="hypertension"]', 'hypertension-details', 'yes');
  toggleDisplay('input[name="spirometry_type"]', 'peak-flow-container', 'fev1');
  toggleDisplay('input[name="teleconsult"]', 'teleconsultant-details', 'done');
  toggleDisplay('input[name="specialist-consult"]', 'specialist-details', 'yes');
  toggleDisplay('input[name="appointment-made"]', 'appointment-date', 'yes');
  toggleDisplay('input[name="virtual-care"]', 'virtual-care-details', 'yes');
  toggleDisplay('input[name="community-health"]', 'community-health-details', 'yes');

  // BMI calculation
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const bmiInput = document.getElementById('bmi');

  function calculateBMI() {
    if (weightInput && heightInput && bmiInput) {
      const weight = parseFloat(weightInput.value);
      const height = parseFloat(heightInput.value) / 100; // convert cm to m
      bmiInput.value = (weight && height > 0) ? (weight / (height * height)).toFixed(1) : "";
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
        bpAverage.value = "";
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

  function calculateWaistHipRatio() {
    if (waistInput && hipInput && ratioDisplay) {
      const waist = parseFloat(waistInput.value);
      const hip = parseFloat(hipInput.value);

      if (waist > 0 && hip > 0) {
        const ratio = (waist / hip).toFixed(2);
        ratioDisplay.textContent = ratio;
      } else {
        ratioDisplay.textContent = "";
      }
    }
  }

  if (waistInput && hipInput) {
    ['input', 'change'].forEach(event => {
      waistInput.addEventListener(event, calculateWaistHipRatio);
      hipInput.addEventListener(event, calculateWaistHipRatio);
    });
    calculateWaistHipRatio();
  }

  // Emergency indicators
  const oxygenInput = document.getElementById('oxygen');
  const oxygenEmergency = document.getElementById('oxygen-emergency');
  const respRateInput = document.getElementById('resp-rate');
  const respRateEmergency = document.getElementById('resp-rate-emergency');
  const heartRateInput = document.getElementById('heart-rate');
  const heartRateEmergency = document.getElementById('heart-rate-emergency');
  const confusionYes = document.querySelector('input[name="confusion"][value="yes"]');
  const confusionNo = document.querySelector('input[name="confusion"][value="no"]');
  const confusionEmergency = document.getElementById('confusion-emergency');
  const wheezingYes = document.querySelector('input[name="wheezing"][value="yes"]');
  const wheezingNo = document.querySelector('input[name="wheezing"][value="no"]');
  const wheezingEmergency = document.getElementById('wheezing-emergency');

  function checkEmergencyValues() {
    // Oxygen saturation
    if (oxygenInput && oxygenEmergency) {
      if (oxygenInput.value && oxygenInput.value < 90) {
        oxygenEmergency.style.display = 'block';
        oxygenInput.style.backgroundColor = '#ffdddd';
        oxygenInput.style.borderColor = 'red';
      } else {
        oxygenEmergency.style.display = 'none';
        oxygenInput.style.backgroundColor = '';
        oxygenInput.style.borderColor = '';
      }
    }
    
    // Respiratory rate
    if (respRateInput && respRateEmergency) {
      if (respRateInput.value && respRateInput.value > 24) {
        respRateEmergency.style.display = 'block';
        respRateInput.style.backgroundColor = '#ffdddd';
        respRateInput.style.borderColor = 'red';
      } else {
        respRateEmergency.style.display = 'none';
        respRateInput.style.backgroundColor = '';
        respRateInput.style.borderColor = '';
      }
    }
    
    // Heart rate
    if (heartRateInput && heartRateEmergency) {
      if (heartRateInput.value && heartRateInput.value > 120) {
        heartRateEmergency.style.display = 'block';
        heartRateInput.style.backgroundColor = '#ffdddd';
        heartRateInput.style.borderColor = 'red';
      } else {
        heartRateEmergency.style.display = 'none';
        heartRateInput.style.backgroundColor = '';
        heartRateInput.style.borderColor = '';
      }
    }
  }

  if (oxygenInput) oxygenInput.addEventListener('input', checkEmergencyValues);
  if (respRateInput) respRateInput.addEventListener('input', checkEmergencyValues);
  if (heartRateInput) heartRateInput.addEventListener('input', checkEmergencyValues);

  if (confusionYes && confusionNo && confusionEmergency) {
    confusionYes.addEventListener('change', function() {
      confusionEmergency.style.display = this.checked ? 'block' : 'none';
    });
    confusionNo.addEventListener('change', function() {
      confusionEmergency.style.display = 'none';
    });
  }

  if (wheezingYes && wheezingNo && wheezingEmergency) {
    wheezingYes.addEventListener('change', function() {
      wheezingEmergency.style.display = 'none';
    });
    wheezingNo.addEventListener('change', function() {
      wheezingEmergency.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Initialize any hidden fields
  document.querySelectorAll('.hidden').forEach(el => {
    el.style.display = 'none';
  });

  // Button functionality
  const saveBtn = document.getElementById('save-btn');
  const submitBtn = document.getElementById('submit-btn');
  const printBtn = document.getElementById('print-btn');

  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      alert('Form data saved successfully!');
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to submit this to EMR?')) {
        alert('Form submitted to EMR successfully!');
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }

  // Info modal functionality
  const modal = document.getElementById("infoModal");
  const infoLinks = document.querySelectorAll(".info-link");
  const infoContent = document.getElementById("infoContent");
  const span = document.getElementsByClassName("close")[0];

  // Examination References content - Focused on Emergency Management and Immediate Assessment
  const examRefData = {
    "emergency-management": `
      <div style="font-size: 22px; line-height: 1.6;">
        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Emergency Management</h3>
        <p style="font-weight: bold; color: var(--danger-color);">Activate when patient shows signs of severe distress</p>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Immediate Actions:</h4>
          <ol style="padding-left: 25px;">
            <li><strong>Nasal Oxygen high flow</strong> → Goal O₂ saturation >92%</li>
            <li><strong>Inhaler drug:</strong> Short-acting beta agonist (SABA) = Albuterol (Multiple puffs)</li>
            <li><strong>Hydrocortisone</strong> 100 mg I.V.</li>
            <li><strong>Reassurance</strong> and patient calming</li>
            <li><strong>Observation</strong> with repeat assessments:
              <ul style="padding-left: 20px; margin-top: 5px;">
                <li>Peak flow rate</li>
                <li>CBC (for infection)</li>
                <li>Chest X-ray (if indicated)</li>
              </ul>
            </li>
            <li><strong>Temporary increase</strong> in frequency of regular drug treatment</li>
          </ol>
        </div>
        
        <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color); margin-bottom: 20px;">
          <h4 style="color: var(--danger-color); margin-top: 0;">Critical Action Required:</h4>
          <p style="font-weight: bold; margin-bottom: 0;">IF NO IMPROVEMENT AFTER 15-30 MINUTES → ACTIVATE EMERGENCY RESPONSE AND SEEK IMMEDIATE TELECONSULTATION</p>
        </div>
      </div>
    `,
    "immediate-assessment": `
      <div style="font-size: 22px; line-height: 1.6;">
        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Immediate Assessment Protocol</h3>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Assessment Steps:</h4>
          <ol style="padding-left: 25px;">
            <li><strong>Evaluate respiratory distress:</strong> Assess work of breathing, accessory muscle use</li>
            <li><strong>Check oxygenation:</strong> Measure SpO₂ with pulse oximetry</li>
            <li><strong>Assess air movement:</strong> Listen for wheezing or silent chest</li>
            <li><strong>Evaluate mental status:</strong> Check for confusion or lethargy</li>
            <li><strong>Measure peak flow:</strong> If possible (values <50% predicted indicate severe attack)</li>
            <li><strong>Check vital signs:</strong> Heart rate, respiratory rate, blood pressure</li>
          </ol>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-bottom: 20px;">
          <h4 style="color: var(--primary-color); margin-top: 0;">Severity Indicators:</h4>
          <ul style="padding-left: 25px;">
            <li>SpO₂ <90%</li>
            <li>Respiratory rate >30/min</li>
            <li>Heart rate >120/min</li>
            <li>Inability to speak in full sentences</li>
            <li>Use of accessory muscles</li>
            <li>Altered mental status</li>
          </ul>
        </div>
        
        <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color);">
          <h4 style="color: var(--danger-color); margin-top: 0;">Emergency Action Required:</h4>
          <p style="font-weight: bold; margin-bottom: 0;">If any severity indicators present → Initiate Emergency Management Protocol immediately</p>
        </div>
      </div>
    `,
    "asthma-guidelines": "Asthma acute attack management guidelines recommend:<br><br>1. Immediate assessment of severity<br>2. Oxygen therapy if saturation <90%<br>3. Short-acting beta agonists (SABA) as first-line treatment<br>4. Systemic corticosteroids for moderate to severe attacks<br>5. Continuous monitoring until improvement",
    "inhaler-technique": "Proper inhaler technique during acute attack:<br><br>1. Shake inhaler well before use<br>2. Exhale completely away from inhaler<br>3. Place mouthpiece between teeth and seal lips<br>4. Press canister while starting to inhale slowly<br>5. Hold breath for 10 seconds if possible<br>6. Wait 1 minute between puffs",
    "wheezing": "Wheezing characteristics in acute asthma:<br><br>- High-pitched whistling sounds<br>- Typically more pronounced during expiration<br>- May be absent in severe obstruction (silent chest)<br>- Changes with bronchodilator treatment",
    "lung-auscultation": "Lung auscultation findings in acute asthma:<br><br>- Wheezing (expiratory or biphasic)<br>- Prolonged expiratory phase<br>- Reduced breath sounds in severe obstruction<br>- Crackles may indicate complicating pneumonia",
    "patient-education": "Patient education after acute attack:<br><br>1. Review inhaler technique<br>2. Identify and avoid triggers<br>3. Understand action plan<br>4. Recognize warning signs of worsening<br>5. Importance of follow-up<br>6. When to seek emergency care"
  };

  // When user clicks on an info link, open the modal
  if (infoLinks.length && modal && infoContent) {
    infoLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const infoKey = this.getAttribute('data-info');
        if (examRefData[infoKey]) {
          infoContent.innerHTML = examRefData[infoKey];
          modal.style.display = "block";
          
          // Scroll modal content to top when opened
          infoContent.scrollTop = 0;
        }
      });
    });
  }

  // When user clicks on (x), close the modal
  if (span && modal) {
    span.onclick = function() {
      modal.style.display = "none";
    }
  }

  // When user clicks anywhere outside the modal, close it
  if (modal) {
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  // Navigation within the form
  const tocLinks = document.querySelectorAll('.template-toc a');
  if (tocLinks.length) {
    tocLinks.forEach(anchor => {
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
  }

  // Make sure all panels are fully visible
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.overflow = 'visible';
    panel.style.maxHeight = 'none';
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


});