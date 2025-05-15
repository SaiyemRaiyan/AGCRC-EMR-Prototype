
    document.addEventListener('DOMContentLoaded', function() {
      // Set current date
      const today = new Date();
      const visitDateInput = document.getElementById('visit-date');
      const examDateInput = document.getElementById('exam-date');
      if (visitDateInput) {
        visitDateInput.valueAsDate = today;
      }
      if (examDateInput) {
        examDateInput.valueAsDate = today;
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
      toggleDisplay('input[name="acute-problem"]', 'acute-problem-details', 'yes');
      toggleDisplay('input[name="murmurs"]', 'murmur-details', 'present');
      toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
      toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
      toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
      toggleDisplay('input[name="rectum"]', 'rectum-details', 'abnormal');
      toggleDisplay('input[name="immediate-tests"]', 'immediate-tests-details', 'specific');
      toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'yes');

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
        "abdominal-pain-guidelines": `
          <h3 style="color: var(--primary-color);">Abdominal Pain Evaluation Guidelines</h3>
          <p><strong>Key considerations for abdominal pain evaluation:</strong></p>
          <ol>
            <li>Assess for life-threatening conditions first (e.g., myocardial infarction, aortic dissection, perforated viscus)</li>
            <li>Evaluate pain characteristics: location, radiation, quality, severity, timing, aggravating/alleviating factors</li>
            <li>Check for associated symptoms: nausea/vomiting, diarrhea/constipation, fever, urinary symptoms</li>
            <li>Assess for red flags: hypotension, tachycardia, fever, rebound tenderness, guarding, rigidity</li>
            <li>Consider patient demographics and risk factors (age, gender, medical history)</li>
          </ol>
          <p><strong>Diagnostic approach:</strong></p>
          <ul>
            <li>RUQ pain: Consider cholecystitis, hepatitis, pneumonia, pyelonephritis</li>
            <li>Epigastric pain: Consider gastritis, PUD, pancreatitis, MI</li>
            <li>RLQ pain: Consider appendicitis, diverticulitis, ovarian pathology</li>
            <li>Diffuse pain: Consider gastroenteritis, bowel obstruction, peritonitis</li>
          </ul>
        `,
        "appendicitis-treatment": `
          <h3 style="color: var(--primary-color);">Evidence for Antibiotic Treatment of Uncomplicated Appendicitis</h3>
          <p><strong>Key studies supporting antibiotic treatment for uncomplicated appendicitis:</strong></p>
          <ol>
            <li><strong>JAMA 2015;313:2340-48</strong>: Randomized trial showing antibiotics non-inferior to surgery for uncomplicated appendicitis</li>
            <li><strong>JAMA 2018;320:1259-65</strong>: 5-year follow-up showing sustained efficacy of antibiotic treatment</li>
            <li><strong>Annals Surgery 2015;261:67-71</strong>: Meta-analysis supporting antibiotics as first-line treatment</li>
            <li><strong>Brit J Surgery 2017;104:1785-90</strong>: Cost-effectiveness analysis favoring antibiotics</li>
          </ol>
          <p><strong>Inclusion criteria for antibiotic treatment:</strong></p>
          <ul>
            <li>No evidence of perforation or abscess</li>
            <li>No signs of systemic sepsis</li>
            <li>WBC <18,000</li>
            <li>No appendicolith on imaging</li>
          </ul>
        `,
        "diarrhea-template": `
          <h3 style="color: var(--primary-color);">Diarrhea Evaluation Template</h3>
          <p><strong>Key components of diarrhea evaluation:</strong></p>
          <ol>
            <li>Acute vs chronic (>4 weeks duration)</li>
            <li>Inflammatory vs non-inflammatory characteristics</li>
            <li>Risk factors: travel, antibiotics, food exposures</li>
            <li>Associated symptoms: fever, weight loss, blood in stool</li>
            <li>Physical exam: hydration status, abdominal tenderness</li>
          </ol>
          <p><strong>Diagnostic approach:</strong></p>
          <ul>
            <li><strong>Acute diarrhea</strong>: Usually viral; consider stool studies if severe/persistent</li>
            <li><strong>Chronic diarrhea</strong>: Categorize as watery, fatty, or inflammatory</li>
            <li><strong>Inflammatory markers</strong>: Fecal calprotectin, lactoferrin</li>
            <li><strong>Endoscopic evaluation</strong>: Colonoscopy with biopsies if chronic</li>
          </ul>
        `,
        "gynecological-template": `
          <h3 style="color: var(--primary-color);">Gynecological Problem Evaluation Template</h3>
          <p><strong>Key components of gynecological evaluation:</strong></p>
          <ol>
            <li>Menstrual history: LMP, cycle regularity, flow characteristics</li>
            <li>Sexual history: Activity, contraception, STI risk</li>
            <li>Pregnancy status: Always confirm in reproductive-age women</li>
            <li>Associated symptoms: Dyspareunia, dysuria, vaginal discharge</li>
          </ol>
          <p><strong>Physical exam components:</strong></p>
          <ul>
            <li><strong>Abdominal exam</strong>: Tenderness, masses, distension</li>
            <li><strong>Pelvic exam</strong>: Speculum and bimanual (if indicated)</li>
            <li><strong>Adnexal evaluation</strong>: Tenderness, masses</li>
            <li><strong>Cervical motion tenderness</strong>: Suggests PID</li>
          </ul>
          <p><strong>Diagnostic tests:</strong></p>
          <ul>
            <li>Pregnancy test</li>
            <li>Pelvic ultrasound</li>
            <li>STI testing if indicated</li>
            <li>Pap smear if due</li>
          </ul>
        `,
        "gerd-template": `
          <h3 style="color: var(--primary-color);">GERD Evaluation Template</h3>
          <p><strong>Typical symptoms:</strong></p>
          <ul>
            <li>Heartburn (retrosternal burning)</li>
            <li>Regurgitation</li>
            <li>Water brash</li>
          </ul>
          <p><strong>Atypical symptoms:</strong></p>
          <ul>
            <li>Chronic cough</li>
            <li>Hoarseness</li>
            <li>Asthma exacerbations</li>
            <li>Non-cardiac chest pain</li>
          </ul>
          <p><strong>Alarm symptoms requiring endoscopy:</strong></p>
          <ol>
            <li>Dysphagia</li>
            <li>Odynophagia</li>
            <li>Weight loss</li>
            <li>Anemia</li>
            <li>Hematemesis</li>
            <li>Family history of GI malignancy</li>
          </ol>
        `,
        "red-flags": `
          <h3 style="color: var(--primary-color);">Red Flags in Abdominal Pain</h3>
          <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color);">
            <p><strong>Immediate action required for:</strong></p>
            <ul>
              <li>Signs of peritonitis (rebound tenderness, guarding, rigidity)</li>
              <li>Hemodynamic instability (hypotension, tachycardia)</li>
              <li>Suspected ruptured AAA (pulsatile mass, syncope, shock)</li>
              <li>Severe dehydration or sepsis</li>
            </ul>
          </div>
          <p><strong>Other concerning features:</strong></p>
          <ol>
            <li>Age >50 with new symptoms</li>
            <li>Weight loss >10% body weight</li>
            <li>Nocturnal pain waking patient</li>
            <li>Hematemesis or melena</li>
            <li>Jaundice</li>
            <li>Family history of GI malignancy</li>
          </ol>
          <p><strong>Diagnostic considerations for red flags:</strong></p>
          <ul>
            <li>Mesenteric ischemia (pain out of proportion to exam)</li>
            <li>Bowel obstruction (distension, vomiting, obstipation)</li>
            <li>Perforated viscus (rigid abdomen, free air on imaging)</li>
            <li>Ectopic pregnancy (positive pregnancy test with pain)</li>
          </ul>
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
              document.body.style.overflow = "hidden"; 
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
              
  
      // When user clicks on (x), close the modal
      if (span && modal) {
        span.onclick = function() {
          modal.style.display = "none";
          document.body.style.overflow = "auto"; 
        }
      }

      // When user clicks anywhere outside the modal, close it
      if (modal) {
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; 
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
    });
