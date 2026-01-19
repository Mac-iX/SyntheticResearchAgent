# Agent Test Cases

## DARA Mode Test Cases

### Test Case 1: Restaurant Market Research
**Input:**
- Mode: DARA
- Topic: "Pizza restaurant franchising opportunities"
- Region: "Eastern North Carolina coastal towns"

**Expected Output Modules:**
1. Foundational Research - Demographics and psychographics of the region
2. Audience Segmentation - 3-5 distinct customer segments
3. Persona Generation - Detailed personas for each segment
4. Simulated Inquiry - Survey questions and persona responses
5. Strategic Synthesis - Product development and marketing recommendations

**Success Criteria:**
- All 5 modules execute without errors
- Output includes specific regional data
- Personas are distinct and realistic
- Recommendations are actionable

---

### Test Case 2: Voter Research
**Input:**
- Mode: DARA
- Topic: "Environmental policy voter sentiment"
- Region: "Pacific Northwest"

**Expected Output:**
- Voter segments based on environmental attitudes
- Personas representing different political perspectives
- Simulated responses to policy questions
- Campaign messaging recommendations

---

## DIDI Mode Test Cases

### Test Case 3: Business Strategy Research
**Input:**
- Mode: DIDI
- Topic: "AI-powered customer service platforms"
- Modules: All DIDI modules

**Expected Output:**
- Deep analysis across all 10 research dimensions
- Structured insights with citations
- Strategic recommendations
- Quality-reviewed conclusions

---

### Test Case 4: Custom Module Selection
**Input:**
- Mode: Custom
- Topic: "Sustainable fashion brand positioning"
- Modules: 
  - foundational_research (DARA)
  - deep_intelligence (DIDI)
  - deep_synthesis (DIDI)
  - strategic_synthesis (DARA)

**Expected Output:**
- Hybrid research combining audience and market intelligence
- Cross-domain insights
- Actionable brand positioning strategy

---

## Error Handling Test Cases

### Test Case 5: Missing Required Input
**Input:**
- Mode: DARA
- Topic: "Electric vehicles"
- Region: (not provided)

**Expected Behavior:**
- Validation error
- Clear error message: "DARA mode requires a geographic region"
- No API calls made

---

### Test Case 6: Invalid Module Selection
**Input:**
- Mode: Custom
- Topic: "Healthcare innovation"
- Modules: []

**Expected Behavior:**
- Validation error
- Error message: "Custom mode requires at least one module"

---

## Performance Test Cases

### Test Case 7: Full DARA Chain
**Metrics to Track:**
- Total execution time
- Individual module execution times
- Token usage per module
- Output file size

**Acceptable Performance:**
- Total time: < 5 minutes
- No module should timeout
- Output should be well-formatted markdown

---

## Integration Test Cases

### Test Case 8: Session Logging
**Test:**
1. Run any research session
2. Check `/logs` directory for session file
3. Verify log contains timestamp, model, metadata, prompt, and response

**Success Criteria:**
- Log file is created
- JSON is valid and complete
- Timestamps are accurate

---

### Test Case 9: Report Export
**Test:**
1. Complete a research session
2. Save report as markdown
3. Verify file structure and formatting

**Success Criteria:**
- File is created in `/logs` directory
- Markdown is properly formatted
- All module outputs are included
- Metadata section is complete
