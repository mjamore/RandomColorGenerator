var options = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e'];
var generatedValues = [];
var genValsCurrentIndex = 2;

var hexValue = '';

var $bgBtn = document.getElementById('bgBtn');
var $prevColorBtn = document.getElementById('prevColorBtn');
var $nextColorBtn = document.getElementById('nextColorBtn');
var $closeBtn = document.getElementById('closeBtn');
var $showPanelBtn = document.getElementById('showPanelBtn');

function generateRandomHex()
{
	hexValue = '#'
	for( var i = 0; i < 6; i++)
	{
		randomSelection = options[Math.floor(Math.random() * options.length)];
		hexValue += randomSelection;
	}

	generatedValues.push(hexValue);
	console.log(generatedValues);

	genValsCurrentIndex = 2;

	setColor(hexValue);
	updateLabels(hexValue);

	if(generatedValues.length > 1)
	{
		$prevColorBtn.style.display = 'inline-block';
	}
	else
	{
		$prevColorBtn.style.display = 'none';	
	}
}

function updateLabels(hexValue)
{
	var $hexLabel = document.getElementById('hexLabel');
	$hexLabel.innerHTML = hexValue;


	var rgbValue = document.body.style.backgroundColor;
	var $rgbLabel = document.getElementById('rgbLabel');
	$rgbLabel.innerHTML = rgbValue;
}

function setColor(hexValue)
{
	document.body.style.backgroundColor = hexValue;
}

generateRandomHex();


function togglePanel($panel)
{
	// If panel is open, close it
	var $panel = document.getElementById('panel');
	var $showPanelBtn = document.getElementById('showPanelBtn');
	if($panel.style.display === 'none')
	{
		$panel.style.display = 'inline-block';
		$showPanelBtn.style.display = 'none';
	}
	else
	{
		$panel.style.display = 'none';
		$showPanelBtn.style.display = 'inline-block';
	}
}

function loadPrevColor()
{
	if((generatedValues.length - genValsCurrentIndex) === 0)
	{
		$prevColorBtn.style.display = 'none';
	}
	var prevColor = generatedValues[generatedValues.length - genValsCurrentIndex];
	genValsCurrentIndex++;
	if(genValsCurrentIndex > 2)
	{
		$nextColorBtn.style.display = 'inline-block';
	}

	console.log(prevColor);
	setColor(prevColor);
	updateLabels(prevColor);
}

function loadNextColor()
{
	console.log(genValsCurrentIndex);
	var nextColor = generatedValues[genValsCurrentIndex - 1];
	genValsCurrentIndex--;
	if(genValsCurrentIndex === 2)
	{
		$nextColorBtn.style.display = 'none';
	}
	if(genValsCurrentIndex > 2)
	{
		$nextColorBtn.style.display = 'inline-block';
	}

	console.log(nextColor);
	setColor(nextColor);
	updateLabels(nextColor);
}




$bgBtn.onclick = generateRandomHex;
$closeBtn.onclick = togglePanel;
$showPanelBtn.onclick = togglePanel;
$prevColorBtn.onclick = loadPrevColor;
$nextColorBtn.onclick = loadNextColor;



















