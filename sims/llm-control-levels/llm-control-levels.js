// global variables for width and height
let containerWidth; // calculated by container
let containerHeight = 550; // fixed height on page
let canvasWidth; // same as containerWidth, for clarity

// Variables for the stair diagram
let layers = [];
let descriptions = [];
let currentHover = -1;
let m; // margins around the steps
let mt; // margin from the top
let mr; // margin on right side
let sw; // step indentation width
let sh; // step height

function setup() {
    // Create a canvas to match the parent container's size
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    
    // Initialize the layout (will be updated in updateLayout)
    updateLayout();
    
    // Define the descriptions
    descriptions = [
        "Level 0 - No Control: LLMs function purely as information processors, generating outputs with no ability to influence program execution. All workflows and decisions are predetermined by human-written code. This is the most constrained level where the LLM acts only as a stateless question-answering system with no agency or control over application behavior.",
        
        "Level 1 - Decision Support: LLMs can influence conditional branches in existing workflows, essentially acting as a sophisticated decision-making component that determines which predefined path to take based on analysis. This simple form of agency allows the LLM to make specific choices within a rigid structure designed by developers.",
        
        "Level 2 - Function Selection: LLMs can select and call specific functions from a predefined tool catalog based on their understanding of the task. The agent chooses which tools to use but operates within a fixed set of capabilities. At this level, the LLM gains the ability to determine what actions to take, though the available tools themselves are predetermined.",
        
        "Level 3 - Flow Control: LLMs determine not just which functions to call but also the order, frequency, and conditions for termination. They control program flow, deciding when to loop, continue, or conclude a process. This level enables more sophisticated problem-solving as the LLM can create multi-step plans and implement iterative approaches.",
        
        "Level 4 - Workflow Initiation: LLMs can spawn additional agent workflows, effectively creating sub-agents to handle specialized tasks. This enables complex hierarchical problem-solving with task delegation. At this level, the LLM can orchestrate entire systems of agents working together on different aspects of a problem.",
        
        "Level 5 - Code Generation: LLMs can write, execute, and evaluate original code in real-time, essentially programming themselves to solve novel problems beyond their predefined toolset. This highest level of control represents true computational agency, where the LLM can create new capabilities on demand to address unforeseen challenges."
    ];
    
    describe('LLM Agent Control Levels - Interactive visualization showing different levels of control for LLM agents', 'LABEL');
}

function updateLayout() {
    // Calculate responsive dimensions based on container width
    m = max(10, containerWidth * 0.03); // margins around the steps
    mt = 50; // margin from the top
    mr = max(30, containerWidth * 0.05); // margin from the right
    
    // Adjust step sizes based on container width
    if (containerWidth < 400) {
        sw = 25; // step indentation for small screens
        sh = 40; // step height for small screens
    } else if (containerWidth < 600) {
        sw = 30; // step indentation for medium screens
        sh = 50; // step height for medium screens
    } else {
        sw = 40; // step indentation for large screens
        sh = 60; // step height for large screens
    }
    
    // Define the layers and labels with colors representing increasing agency levels
    // Note: we don't set fixed widths here - they'll be calculated in the draw function
    layers = [
        {x: m,      y: sh*5+mt, level: "Level 0 - No Control", color: "#AFAFAF", tcolor: "black" },  
        {x: sw+m,   y: sh*4+mt, level: "Level 1 - Decision Support", color: "#4682B4", tcolor: "white" },
        {x: sw*2+m, y: sh*3+mt, level: "Level 2 - Function Selection", color: "#20B2AA", tcolor: "white" },
        {x: sw*3+m, y: sh*2+mt, level: "Level 3 - Flow Control", color: "#9370DB", tcolor: "white" },
        {x: sw*4+m, y: sh*1+mt, level: "Level 4 - Workflow Initiation", color: "#FF8C00", tcolor: "black" },
        {x: sw*5+m, y: mt,      level: "Level 5 - Code Generation", color: "#FF4500", tcolor: "white" }
    ];
    
    // For very small screens, shorten the level labels
    if (containerWidth < 500) {
        layers[0].level = "L0 - No Control";
        layers[1].level = "L1 - Decision";
        layers[2].level = "L2 - Function";
        layers[3].level = "L3 - Flow";
        layers[4].level = "L4 - Workflow";
        layers[5].level = "L5 - Code Gen";
    }
}

function draw() {
    background('aliceblue');
    
    // Add title - responsive font size
    let titleSize = constrain(containerWidth * 0.035, 16, 22);
    textSize(titleSize);
    textAlign(CENTER, TOP);
    fill(0);
    strokeWeight(0);
    text("LLM Agent Control Levels", width/2, 10);
    
    // Responsive text size for steps
    let stepTextSize = constrain(containerWidth * 0.025, 10, 16);
    
    // Draw layers and add labels
    textSize(stepTextSize);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < layers.length; i++) {
        let l = layers[i];
        
        // Calculate the width for this step - spans from x position to right edge minus margin
        let stepWidth = containerWidth - l.x - mr;
        
        // Highlight the currently hovered step
        if (i === currentHover) {
            stroke('blue');
            strokeWeight(3);
        } else {
            stroke('gray');
            strokeWeight(1);
        }
        
        // Draw the level rectangle
        fill(l.color);
        rect(l.x, l.y, stepWidth, sh);
        
        // Draw the level label
        fill(l.tcolor);
        strokeWeight(0);
        text(l.level, l.x + stepWidth / 2, l.y + sh / 2);
    }
    
    // Calculate description area position
    let descriptionY = sh*6 + mt + 30;
    
    // Display description text under the step diagram
    if (currentHover !== -1) {
        let descTextSize = constrain(containerWidth * 0.025, 11, 16);
        textSize(descTextSize);
        fill(0);
        textAlign(LEFT, TOP);
        noStroke();
        
        // Adaptive width for description text
        let descWidth = containerWidth - 40;
        text(descriptions[currentHover], 20, descriptionY, descWidth, 200);
    } else {
        // Default text when nothing is hovered
        let defaultTextSize = constrain(containerWidth * 0.03, 14, 18);
        textSize(defaultTextSize);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Hover over a level to see details", width/2, descriptionY + 30);
    }
}

function mouseMoved() {
    // Reset hover state
    currentHover = -1;
    
    // Check which level is being hovered over
    for (let i = 0; i < layers.length; i++) {
        let l = layers[i];
        let stepWidth = containerWidth - l.x - mr;
        
        if (mouseX >= l.x && mouseX <= l.x + stepWidth && 
            mouseY >= l.y && mouseY <= l.y + sh) {
            currentHover = i;
            break;
        }
    }
}

function touchStarted() {
    // For touch devices, check which step was touched
    currentHover = -1;
    
    for (let i = 0; i < layers.length; i++) {
        let l = layers[i];
        let stepWidth = containerWidth - l.x - mr;
        
        if (mouseX >= l.x && mouseX <= l.x + stepWidth && 
            mouseY >= l.y && mouseY <= l.y + sh) {
            currentHover = i;
            return false; // Prevent default
        }
    }
    return false;
}

function windowResized() {
    // Update canvas size when the container resizes
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    // Get the exact dimensions of the container
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);  // Avoid fractional pixels
    canvasWidth = containerWidth;
}