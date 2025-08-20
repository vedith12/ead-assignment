//  State
const state = {
  teamRuns: 0,
  wickets: 0,
  overs: 0,
  balls: 0,            // 0..5 valid balls within current over
  striker: 'Rahul',    // 'Rahul' | 'Rohit'
  freeHitNext: false,  // next delivery: no wicket, no ball increment 
  players: {
    Rahul: { runs: 0, balls: 0, out: false },
    Rohit: { runs: 0, balls: 0, out: false },
  },
};

// Elements 
const elTeam = document.getElementById('teamScore');
const elOvers = document.getElementById('overs');
const elStatus = document.getElementById('status');

const rahulCard = document.getElementById('rahulCard');
const rohitCard = document.getElementById('rohitCard');
const rahulName = document.getElementById('rahulName');
const rohitName = document.getElementById('rohitName');
const rahulRuns = document.getElementById('rahulRuns');
const rohitRuns = document.getElementById('rohitRuns');
const rahulBalls = document.getElementById('rahulBalls');
const rohitBalls = document.getElementById('rohitBalls');

// Helpers 
function inningsOver() { return state.wickets >= 10; }
function showStatus(msg){ elStatus.textContent = msg; }
function fmtOvers(){ return `${state.overs}.${state.balls}`; }

function render(){
  elTeam.textContent = `${state.teamRuns}/${state.wickets}`;
  elOvers.textContent = fmtOvers();
  rahulRuns.textContent = state.players.Rahul.runs;
  rohitRuns.textContent = state.players.Rohit.runs;
  rahulBalls.textContent = state.players.Rahul.balls;
  rohitBalls.textContent = state.players.Rohit.balls;

  const rahulIsStriker = state.striker === 'Rahul';
  rahulCard.classList.toggle('striker', rahulIsStriker);
  rohitCard.classList.toggle('striker', !rahulIsStriker);
  rahulName.textContent = rahulIsStriker ? 'Rahul*' : 'Rahul';
  rohitName.textContent = !rahulIsStriker ? 'Rohit*' : 'Rohit';
}

function countValidBall(){
  state.balls += 1;
  if(state.balls === 6){
    state.overs += 1;
    state.balls = 0;
  }
}

function switchStriker(){
  state.striker = state.striker === 'Rahul' ? 'Rohit' : 'Rahul';
  showStatus('Striker switched');
  render();
}

//  Event Handlers 
function handleRuns(n){
  if (inningsOver()) return;
  const p = state.players[state.striker];

  state.teamRuns += n;
  p.runs += n;
  p.balls += 1;

  // consume free-hit flag (affects only wicket rule & ball increment)
  if (state.freeHitNext) state.freeHitNext = false;

  // valid delivery: increment ball
  countValidBall();
  render();

  // odd runs switch striker after render
  if (n % 2 === 1) switchStriker();
  showStatus(`Runs: ${n}`);
}

function handleWide(){
  if (inningsOver()) return;
  state.teamRuns += 1; // team only
  // no ball increment
  render();
  showStatus('Wide +1');
}

function handleNoBall(){
  if (inningsOver()) return;
  // +1 to team and striker, no ball increment
  const p = state.players[state.striker];
  state.teamRuns += 1;
  p.runs += 1;
  render();
  showStatus('No Ball +1 (no ball count)');
}

function handleFreeHit(){
  if (inningsOver()) return;
  // +1 team and set next ball as free hit; next delivery: no wicket, no ball increment 
  state.teamRuns += 1;
  state.freeHitNext = true;
  render();
  showStatus('Free Hit set for next ball (+1)');
}

function handleBye(){
  if (inningsOver()) return;
  state.teamRuns += 1; // team only
  countValidBall();
  render();
  showStatus('Bye +1');
}

function handleLegBye(){
  if (inningsOver()) return;
  state.teamRuns += 1; // team only
  countValidBall();
  render();
  showStatus('Leg Bye +1');
}

function handleWicket(kind){
  if (inningsOver()) return;

  // on free hit: no wicket and no ball increment 
  if (state.freeHitNext){
    state.freeHitNext = false;
    render();
    showStatus(`${kind} on Free Hit: Not Out (no ball)`);
    return;
  }

  const p = state.players[state.striker];
  p.out = true;
  p.balls += 1;

  state.wickets = Math.min(10, state.wickets + 1);
  countValidBall();

  // After wicket/LBW: new batsman replaces the OUT striker, non-striker faces next ball
  // So make the other opener the striker
  state.striker = state.striker === 'Rahul' ? 'Rohit' : 'Rahul';


  render();
  showStatus(`${kind}!`);
}

function handleReset(){
  state.teamRuns = 0;
  state.wickets = 0;
  state.overs = 0;
  state.balls = 0;
  state.striker = 'Rahul';
  state.freeHitNext = false;
  state.players = {
    Rahul: { runs: 0, balls: 0, out: false },
    Rohit: { runs: 0, balls: 0, out: false },
  };
  render();
  showStatus('Reset');
}

// Wire Up 
document.querySelectorAll('.btn-run').forEach(b=>{
  b.onclick = () => handleRuns(parseInt(b.dataset.r,10));
});
document.getElementById('wideBtn').onclick = handleWide;
document.getElementById('noballBtn').onclick = handleNoBall;
document.getElementById('freehitBtn').onclick = handleFreeHit;
document.getElementById('byeBtn').onclick = handleBye;
document.getElementById('legbyeBtn').onclick = handleLegBye;
document.getElementById('wicketBtn').onclick = () => handleWicket('Wicket');
document.getElementById('lbwBtn').onclick = () => handleWicket('LBW');
document.getElementById('switchBtn').onclick = switchStriker;
document.getElementById('resetBtn').onclick = handleReset;

//  Init 
render();
showStatus('Ready');
