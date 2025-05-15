
    document.addEventListener('DOMContentLoaded', function() {
            // Set current date
    const today = new Date();
    const visitDateInput = document.getElementById('visit-date');
    if (visitDateInput) {
        visitDateInput.valueAsDate = today;
    }

         
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

            // Toggle display for consultant name
    const teleconsultRadios = document.querySelectorAll('input[name="teleconsult"]');
    const consultantNameInput = document.getElementById('consultant-name');

    function toggleConsultantName() {
        const selected = document.querySelector('input[name="teleconsult"]:checked');
        if (selected) {
            const show = selected.value === 'yes';
            consultantNameInput.style.display = show ? 'block' : 'none';
        }
    }

    if (teleconsultRadios.length && consultantNameInput) {
        teleconsultRadios.forEach(radio => {
            radio.addEventListener('change', toggleConsultantName);
        });
        toggleConsultantName();
    }

                // Toggle display for other interventions
    const interventionsRadios = document.querySelectorAll('input[name="interventions"]');
    const otherInterventionsTextarea = document.getElementById('other-interventions');

    function toggleOtherInterventions() {
        const selected = document.querySelector('input[name="interventions"]:checked');
        if (selected) {
            const show = selected.value === 'other';
            otherInterventionsTextarea.style.display = show ? 'block' : 'none';
        }
    }

    if (interventionsRadios.length && otherInterventionsTextarea) {
        interventionsRadios.forEach(radio => {
            radio.addEventListener('change', toggleOtherInterventions);
        });
        toggleOtherInterventions();
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
        "anemia-guidelines": `
            <h3 style="color: var(--primary-color);">Anemia Diagnosis Guidelines</h3>
            <p>Anemia is defined as:
            <br>Anemia is a low red cell mass relative to gender, as assessed by measurement of blood hemoglobin and/or hematocrit levels. For women aged 15-49, low hemoglobin levels are less than 10.9 gm/dL (Hematocrit 33 vols%) and are found in 42% of Bangladeshi women; such low levels are associated with low BMI and pregnancy. Iron deficiency is the commonest cause, and non-adherence to iron supplementation occurs in >20% of patients because of side effects. In Bangladeshi men, anemia is defined as a hemoglobin level of <13.0 gm/dL. Hookworm infection in rice farmers is a source of gastrointestinal blood loss→anemia. </br>
            </p>
            <ul>
                <li>For women aged 15-49: Hemoglobin < 10.9 g/dL (Hematocrit < 33%)</li>
                <li>For men: Hemoglobin < 13.0 g/dL</li>
            </ul>
            <p>Common causes in Bangladesh:</p>
            <ul>
                <li>Iron deficiency (most common)</li>
                <li>Hookworm infection (especially in rice farmers)</li>
                <li>Nutritional deficiencies (B12, folate)</li>
                <li>Chronic diseases</li>
                <li>Lead poisoning (near industrial areas)</li>
            </ul>
        `,
        "iron-deficiency": `
            <h3 style="color: var(--primary-color);">Iron Deficiency Signs</h3>
            <p>Clinical signs of iron deficiency anemia:</p>
            <ul>
                <li>Pallor (conjunctiva, nail beds, palm creases)</li>
                <li>Cheilosis (cracking at corners of mouth)</li>
                <li>Koilonychia (spoon-shaped nails)</li>
                <li>Atrophic glossitis (smooth, sore tongue)</li>
                <li>Pica (craving for non-food items like ice or dirt)</li>
            </ul>
        `,
        "b12-deficiency": `
            <h3 style="color: var(--primary-color);">Vitamin B12/Folate Deficiency</h3>
            <p>Clinical signs:</p>
            <ul>
                <li>Glossitis (beefy red tongue)</li>
                <li>Neurological symptoms (paresthesia, ataxia, cognitive changes)</li>
                <li>Loss of vibratory sense and proprioception</li>
                <li>Positive Romberg sign</li>
            </ul>
        `,
        "lead-poisoning": `
            <h3 style="color: var(--primary-color);">Lead Poisoning Signs</h3>
            <p>Clinical signs:</p>
            <ul>
                <li>Burton's line (blue line on gums)</li>
                <li>Abdominal pain (lead colic)</li>
                <li>Neurocognitive impairment</li>
                <li>Peripheral neuropathy (wrist drop)</li>
                <li>Microcytic anemia with basophilic stippling</li>
            </ul>
        `,
        "hemolysis": `
            <h3 style="color: var(--primary-color);">Hemolysis Indicators</h3>
            <p>Clinical signs:</p>
            <ul>
                <li>Jaundice</li>
                <li>Splenomegaly</li>
                <li>Dark urine (hemoglobinuria)</li>
                <li>Elevated reticulocyte count</li>
            </ul>
        `,
        "anemia-treatment": `
            <h3 style="color: var(--primary-color);">Anemia Treatment Options</h3>
            <p>Iron supplementation:</p>
            <ul>
                <li>Ferrous sulfate (cheapest but may cause GI upset)</li>
                <li>Ferrous gluconate (better tolerated)</li>
                <li>Liquid formulations available</li>
                <li>Take with vitamin C to enhance absorption</li>
                <li>Continue for 3-6 months after hemoglobin normalizes</li>
            </ul>
        `,
        "patient-education": `
            <h3 style="color: var(--primary-color);">Patient Education</h3>
            <p>Key points to discuss:</p>
            <ul>
                <li>Importance of adherence to iron therapy</li>
                <li>Dietary sources of iron (red meat, leafy greens, legumes)</li>
                <li>Foods that inhibit iron absorption (tea, coffee with meals)</li>
                <li>Expected side effects (dark stools, constipation)</li>
                <li>When to seek follow-up (persistent symptoms, side effects)</li>
            </ul>
        `
    };


              // When user clicks on an info link, open the modal
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

                 // Epigastric abdominal pain
    const abdominalPainYes = document.querySelector('input[name="abdominal-pain"][value="yes"]');
    const abdominalPainNo = document.querySelector('input[name="abdominal-pain"][value="no"]');
    const organSystemField = document.querySelector('input[type="text"][placeholder="Name the body organ system(s)"]');
    const symptomsTextarea = document.querySelector('textarea[placeholder="List any other symptoms"]');

              // Get the parent form-group elements for styling
    const organSystemGroup = organSystemField ? organSystemField.closest('.form-group') : null;
    const symptomsGroup = symptomsTextarea ? symptomsTextarea.closest('.form-group') : null;

                // Function to toggle visibility
    function toggleAbdominalPainFields() {
        if (abdominalPainYes && abdominalPainNo && organSystemGroup && symptomsGroup) {
            const showFields = abdominalPainYes.checked;
            
            // Toggle display of the fields
            organSystemGroup.style.display = showFields ? 'block' : 'none';
            symptomsGroup.style.display = showFields ? 'block' : 'none';
            
            // Clear fields when hiding
            if (!showFields) {
                if (organSystemField) organSystemField.value = '';
                if (symptomsTextarea) symptomsTextarea.value = '';
            }
        }
    }


              // Add event listeners
    if (abdominalPainYes && abdominalPainNo) {
        abdominalPainYes.addEventListener('change', toggleAbdominalPainFields);
        abdominalPainNo.addEventListener('change', toggleAbdominalPainFields);
        
                      // Initialize on page load
        toggleAbdominalPainFields();
    }

              // When user clicks on (x), close the modal
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

            // When user clicks anywhere outside the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

            // Handle all radio groups with link messages - UPDATED FOR RED BOLD TEXT
    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const groupName = this.name;
            const messageElement = document.querySelector(`.link-message[data-for="${groupName}"]`);
            if (messageElement) {
                if (this.value === 'yes' && this.checked) {
                    messageElement.style.display = 'block';
                    messageElement.style.color = 'red';
                    messageElement.style.fontWeight = 'bold';
                } else {
                    messageElement.style.display = 'none';
                }
            }
        });
    });

               // Initialize visibility on page load - UPDATED FOR RED BOLD TEXT
    document.querySelectorAll('.link-message').forEach(msg => {
        const groupName = msg.getAttribute('data-for');
        const yesRadio = document.querySelector(`input[name="${groupName}"][value="yes"]`);
        if (yesRadio && yesRadio.checked) {
            msg.style.display = 'block';
            msg.style.color = 'red';
            msg.style.fontWeight = 'bold';
        } else {
            msg.style.display = 'none';
        }
    });

                       // Navigation within the form
    const tocLinks = document.querySelectorAll('.template-toc a');
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
                          // Get the radio buttons and details div
               const murmursRadios = document.querySelectorAll('input[name="murmurs-present"]');
               const murmursDetails = document.getElementById('murmurs-present-details');

                      // Add event listeners to each radio button
                  murmursRadios.forEach(radio => {
                      radio.addEventListener('change', function() {
                    if (this.value === 'present') {
                          murmursDetails.style.display = 'block';
                     } else {
                          murmursDetails.style.display = 'none';
                        }
            });
        });

             // Get the radio buttons and details div (speen)
        const spleenRadios = document.querySelectorAll('input[name="spleen"]');
        const spleenDetails = document.getElementById('spleen-details');

            // Add event listeners to each radio button
      spleenRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                spleenDetails.style.display = 'block';
            } else {
                spleenDetails.style.display = 'none';
            }
          });
       });

                   // Function to handle anemia radio button changes (Abnormalities with Anemia)
          function handleAnemiaChange() {
           const anemiaYes = document.querySelector('input[name="anemia"][value="yes"]');
           const anemiaMessage = document.querySelector('.link-message[data-for="anemia"]');
    
         if (anemiaYes.checked) {
             anemiaMessage.style.display = 'block';
         } else {
             anemiaMessage.style.display = 'none';
         }
       }

            // Add event listeners to anemia radio buttons
         document.querySelectorAll('input[name="anemia"]').forEach(radio => {
                  radio.addEventListener('change', handleAnemiaChange);
         });

                // Initialize on page load
            document.addEventListener('DOMContentLoaded', function() {
                 handleAnemiaChange(); 
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
