const defaultStages = [
  { id: "stage-0", name: "Genesis obtained (no traces)", tracesRequired: 0 },
  { id: "stage-1", name: "Liberation I – Trace of Courage", tracesRequired: 20 },
  { id: "stage-2", name: "Liberation II – Trace of Destiny", tracesRequired: 40 },
  { id: "stage-3", name: "Liberation III – Trace of Power", tracesRequired: 60 },
  { id: "stage-4", name: "Liberation IV – Trace of Control", tracesRequired: 60 },
  { id: "stage-5", name: "Final Liberation – Trace of Resolve", tracesRequired: 60 }
];

const stageTable = document.getElementById("stage-table");
const stageSelect = document.getElementById("stage-select");
const resetStages = document.getElementById("reset-stages");
const depositedInput = document.getElementById("deposited");
const heldInput = document.getElementById("held");
const weeklyInput = document.getElementById("weekly");
const passInput = document.getElementById("pass");
const startDateInput = document.getElementById("start-date");
const tracesNeededEl = document.getElementById("traces-needed");
const weeksEl = document.getElementById("weeks");
const dateEl = document.getElementById("date");
const timelineEl = document.getElementById("timeline");

function getStagesFromTable() {
  const rows = Array.from(stageTable.querySelectorAll(".stage-row"));
  return rows.map((row) => {
    const id = row.dataset.id;
    const name = row.querySelector("input[name='name']").value.trim();
    const traces = parseInt(row.querySelector("input[name='traces']").value, 10) || 0;
    return { id, name, tracesRequired: traces };
  });
}

function renderStageTable(stages) {
  stageTable.innerHTML = "";
  stages.forEach((stage, index) => {
    const row = document.createElement("div");
    row.className = "stage-row";
    row.dataset.id = stage.id;

    row.innerHTML = `
      <div>
        <label class="field">
          <span>Stage ${index} name</span>
          <input name="name" type="text" value="${stage.name}" />
        </label>
      </div>
      <div>
        <label class="field">
          <span>Traces required</span>
          <input name="traces" type="number" min="0" value="${stage.tracesRequired}" />
        </label>
      </div>
      <div>
        <span>Stage order</span>
        <div class="chip">#${index}</div>
      </div>
    `;

    stageTable.appendChild(row);
  });
}

function renderStageSelect(stages) {
  stageSelect.innerHTML = "";
  stages.forEach((stage, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${index}. ${stage.name}`;
    stageSelect.appendChild(option);
  });
}

function addWeeks(date, weeks) {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + weeks * 7);
  return clone;
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function calculate() {
  const stages = getStagesFromTable();
  const stageIndex = parseInt(stageSelect.value, 10) || 0;
  const deposited = Math.max(parseInt(depositedInput.value, 10) || 0, 0);
  const held = Math.max(parseInt(heldInput.value, 10) || 0, 0);
  const weekly = Math.max(parseInt(weeklyInput.value, 10) || 0, 0);
  const passBonus = Math.max(parseInt(passInput.value, 10) || 0, 0);
  const weeklyTotal = weekly + passBonus;
  const startDate = startDateInput.value ? new Date(startDateInput.value) : new Date();

  const remainingCurrent = Math.max((stages[stageIndex]?.tracesRequired || 0) - deposited, 0);
  const remainingFuture = stages.slice(stageIndex + 1).reduce((sum, stage) => sum + (stage.tracesRequired || 0), 0);
  const totalRemaining = remainingCurrent + remainingFuture;
  const tracesNeeded = Math.max(totalRemaining - held, 0);

  let weeksNeeded = weeklyTotal > 0 ? Math.ceil(tracesNeeded / weeklyTotal) : Infinity;
  let liberationDate = weeklyTotal > 0 ? addWeeks(startDate, weeksNeeded) : null;

  tracesNeededEl.textContent = tracesNeeded;
  weeksEl.textContent = Number.isFinite(weeksNeeded) ? weeksNeeded : "∞";
  dateEl.textContent = liberationDate ? formatDate(liberationDate) : "Not enough data";

  renderTimeline({ stages, stageIndex, deposited, held, weeklyTotal, startDate });
}

function renderTimeline({ stages, stageIndex, deposited, held, weeklyTotal, startDate }) {
  timelineEl.innerHTML = "";
  let inventory = held;
  let currentDate = startDate;

  stages.slice(stageIndex).forEach((stage, offset) => {
    const isCurrent = offset === 0;
    const alreadyIn = isCurrent ? deposited : 0;
    const needed = Math.max(stage.tracesRequired - alreadyIn, 0);

    const usedFromInventory = Math.min(needed, inventory);
    inventory -= usedFromInventory;

    const remainingForStage = needed - usedFromInventory;
    const weeksForStage = remainingForStage === 0 ? 0 : weeklyTotal > 0 ? Math.ceil(remainingForStage / weeklyTotal) : Infinity;

    if (Number.isFinite(weeksForStage)) {
      const earned = weeksForStage * weeklyTotal;
      const leftoverAfterStage = earned - remainingForStage;
      inventory += leftoverAfterStage;
      currentDate = addWeeks(currentDate, weeksForStage);
    }

    const item = document.createElement("div");
    item.className = "timeline-item";

    const label = document.createElement("div");
    label.innerHTML = `<strong>${stage.name}</strong><br><span class="muted">Requires ${stage.tracesRequired} traces</span>`;

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = isCurrent ? "Current stage" : "Upcoming";

    const eta = document.createElement("div");
    eta.className = "eta";
    if (Number.isFinite(weeksForStage)) {
      eta.textContent = weeksForStage === 0 ? "Already covered" : `${weeksForStage} week(s) → ${formatDate(currentDate)}`;
    } else {
      eta.textContent = "No weekly income set";
    }

    item.appendChild(label);
    item.appendChild(chip);
    item.appendChild(eta);
    timelineEl.appendChild(item);
  });
}

function wireInputs() {
  [stageTable, stageSelect, depositedInput, heldInput, weeklyInput, passInput, startDateInput].forEach((el) => {
    el.addEventListener("input", calculate);
    el.addEventListener("change", calculate);
  });

  resetStages.addEventListener("click", () => {
    renderStageTable(defaultStages);
    renderStageSelect(defaultStages);
    stageSelect.value = "0";
    calculate();
  });
}

function init() {
  const todayISO = new Date().toISOString().slice(0, 10);
  startDateInput.value = todayISO;

  renderStageTable(defaultStages);
  renderStageSelect(defaultStages);
  wireInputs();
  calculate();
}

window.addEventListener("DOMContentLoaded", init);
