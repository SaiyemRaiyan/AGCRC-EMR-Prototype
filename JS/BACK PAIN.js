

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
      toggleDisplay('input[name="trauma"]', 'trauma-details', 'yes');
      toggleDisplay('input[name="physical-labor"]', 'labor-details', 'yes');
      toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
      toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
      toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
      toggleDisplay('input[name="vertebrae-tenderness"]', 'vertebrae-tenderness-details', 'local');
      toggleDisplay('input[name="muscles-tenderness"]', 'muscles-tenderness-details', 'local');
      toggleDisplay('input[name="further-tests"]', 'specific-tests', 'specific');
      toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'done');

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

      // Waist/hip ratio calculation
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

      // Info content definitions
      const infoData = {
      "leg-test": `
      <p><strong>Leg Test Strategy: </strong>Patient lies flat on back. Examiner lifts extended leg at heel to 600-700. If pain is reproduced with radiation into the buttock and down the leg, the test is positive. A positive test suggests L5-S1 radiculopathy (sciatica)</p>
          `,
      "stretch-test": `
      <p><strong>Femoral Stretch Test Strategy: </strong>Patient lies on stomach. The examiner flexes the leg at the knee to 900 and then lifts the whole leg/thigh. If the patient complains of pain in the anterior thigh, this is a positive test and suggests radiculopathy in the L2-4 region.</p>
      `,
      "l4": `<p><strong>L4 Strategy: </strong>With patient lying on back, examiner lifts the leg under the knee, and then has the patient kick the leg out against resistance </p>
      `,
      "l5": `<p><strong>L5 Strategy: </strong>With patient lying on back, and legs flat on the exam table, have patient dorsiflex the big toe and foot against resistance. </p>
      `,
      "s1": `<p><strong>S1 Strategy: </strong>With patient lying on back, and legs flat on the exam table, have patient plantar flex the foot against resistance. </p>
      `,

        "cardiac-auscultation": `
          <h3 style="color: var(--primary-color); margin-top: 0;">A PRIMER ON CARDIAC AUSCULTATION</h3>
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
        "back-pain-guidelines": `
          <h3 style="color: var(--primary-color);">Back Pain Management Guidelines</h3>
          <p>Key recommendations for low back pain:</p>
          <ol>
            <li><strong>Acute back pain (≤6 weeks):</strong> Reassurance, activity modification, and simple analgesics (acetaminophen, NSAIDs)</li>
            <li><strong>Subacute back pain (6-12 weeks):</strong> Consider physical therapy and supervised exercise</li>
            <li><strong>Chronic back pain (>12 weeks):</strong> Multidisciplinary approach including cognitive behavioral therapy</li>
            <li><strong>Red flags:</strong> Immediate imaging and specialist referral for:
              <ul>
                <li>Progressive neurological deficits</li>
                <li>Suspected cauda equina syndrome</li>
                <li>Suspected spinal infection or malignancy</li>
              </ul>
            </li>
          </ol>
          <p><strong>Reference:</strong> Chou R, et al. Ann Intern Med. 2021;174(8):ITC113-ITC128.</p>
        `,
        "straight-leg-test": `
          <h3 style="color: var(--primary-color);">Straight Leg Raise Test</h3>
          <p><strong>Purpose:</strong> Assess for lumbar nerve root irritation (L4-S1)</p>
          <p><strong>Technique:</strong></p>
          <ol>
            <li>Patient lies supine</li>
            <li>Examiner lifts leg with knee extended</li>
            <li>Positive test: Pain between 30-70° with radiation below knee</li>
          </ol>
          <p><strong>Interpretation:</strong></p>
          <ul>
            <li>Sensitivity: ~91% for disc herniation with nerve root compression</li>
            <li>Specificity: ~26% (many false positives)</li>
            <li>Crossed SLR (pain in affected leg when raising unaffected leg) is more specific (~88%)</li>
          </ul>
        `,
        "femoral-stretch-test": `
          <h3 style="color: var(--primary-color);">Femoral Stretch Test</h3>
          <p><strong>Purpose:</strong> Assess for upper lumbar nerve root irritation (L2-L4)</p>
          <p><strong>Technique:</strong></p>
          <ol>
            <li>Patient lies prone</li>
            <li>Examiner flexes knee to 90° and extends hip</li>
            <li>Positive test: Pain in anterior thigh</li>
          </ol>
          <p><strong>Interpretation:</strong></p>
          <ul>
            <li>Suggests upper lumbar radiculopathy (L2-L4)</li>
            <li>Less commonly performed than SLR</li>
            <li>Consider in patients with anterior thigh pain</li>
          </ul>
        `,
        "motor-exam": `
          <h3 style="color: var(--primary-color);">Motor Examination for Back Pain</h3>
          <p>Key muscle groups to test:</p>
          <table border="1" cellpadding="5" cellspacing="0" style="width: 100%;">
            <tr>
              <th>Nerve Root</th>
              <th>Muscle</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>L4</td>
              <td>Tibialis anterior</td>
              <td>Dorsiflexion</td>
            </tr>
            <tr>
              <td>L5</td>
              <td>Extensor hallucis longus</td>
              <td>Great toe extension</td>
            </tr>
            <tr>
              <td>S1</td>
              <td>Gastrocnemius/soleus</td>
              <td>Plantar flexion</td>
            </tr>
          </table>
          <p><strong>Grading:</strong> 0-5 scale (0=no contraction, 5=normal strength)</p>
        `,
        "sensory-exam": `
          <h3 style="color: var(--primary-color);">Sensory Examination for Back Pain</h3>
          <p>Key dermatomes to test:</p>
          <table border="1" cellpadding="5" cellspacing="0" style="width: 100%;">
            <tr>
              <th>Nerve Root</th>
              <th>Sensory Area</th>
            </tr>
            <tr>
              <td>L4</td>
              <td>Medial calf and foot</td>
            </tr>
            <tr>
              <td>L5</td>
              <td>Dorsum of foot, first web space</td>
            </tr>
            <tr>
              <td>S1</td>
              <td>Lateral foot</td>
            </tr>
          </table>
          <p><strong>Test both:</strong></p>
          <ul>
            <li>Light touch</li>
            <li>Pinprick</li>
            <li>Vibration (128 Hz tuning fork)</li>
          </ul>
        `,
        "exercises": `
          <h3 style="color: var(--primary-color);">Stretch Exercises for Sciatica</h3>
          <p><strong>1. Hamstring Stretch</strong></p>
          <p>Lying flat on back elevate leg as straight as possible and as far as possible. Helper can do this; after things begin to get better you can do this using a door frame. Do one side and then the other. Hold the stretch at the maximal height for 20 seconds or as long as you can tolerate the discomfort. Repeat x 5 for each leg.</p>
          
          <p><strong>2. Partial Abdominal Crunches</strong></p>
          <p>Lying on back with knees bent and feet on the ground, hands behind head. Tighten stomach muscles and raise shoulders off the ground. Hold to count of 10. Repeat x 10.</p>
          
          <p><strong>3. Knee to Chest</strong></p>
          <p>Lying on back bring leg up bent at the knee and pull the leg as close to the chest as possible. Hold to count of 10. Repeat x 5. Do for each leg.</p>
          
          <p><strong>4. Pelvic Tilt</strong></p>
          <p>Lying on back. Tighten stomach muscles pressing area of the lower back into the ground. Hold to count of 10. Repeat x 5.</p>
          
          <p><strong>5. Press-up Back Extension</strong></p>
          <p>Lying on stomach flat, press up with arms to rest on elbows. Hold for count of 5. Repeat x 5.</p>
          
          <p><strong>6. Wall Sitting</strong></p>
          <p>Stand with back to wall about 1 foot from wall. Lean back to make back flat against the wall. Lower body bending knees. Hold at maximum to count of 5. Repeat x 5.</p>
        `
      };

      // When user clicks on an info link, open the modal
      if (infoLinks.length && modal && infoContent) {
        infoLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const infoKey = this.getAttribute('data-info');
            if (infoData[infoKey]) {
              infoContent.innerHTML = infoData[infoKey];
              modal.style.display = "block";
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
                targetElement.style.backgroundColor = "";
              }, 2000);
            }
          });
        });
      }

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
