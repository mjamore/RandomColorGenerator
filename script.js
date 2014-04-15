var options = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e'];

var hexValue = '';
var colorCodePref = 'hex';
var savedSwatchesArray = [];
var lastSavedColor = '';
var LightShow = false;

var $bgBtn = document.getElementById('bgBtn');
var $panel = document.getElementById('panel');
var $savedColors = document.getElementById('savedColors');
var $scrollWrapper = document.getElementById('scrollWrapper');
var $noSavedColorsLabel = document.getElementById('noSavedColorsLabel');
var $colorCodeLabel = document.getElementById('colorCodeLabel');
var $infoBtn = document.getElementById('infoBtn');
var $popupOverlay = document.getElementById('popupOverlay');
var $infoContent = document.getElementById('infoContent');
var $instructions = document.getElementById('instructions');
var $instructionsTouch = document.getElementById('instructionsTouch');
var $closeBtn = document.getElementById('closeBtn');
var $hexInput = document.getElementById('hexInput');
var $rgbInput = document.getElementById('rgbInput');
var $LightShowFoSho = document.getElementById('LightShowFoSho');
var $panelToggleBtn = document.getElementById('panelToggleBtn');


if(Modernizr.touch)
{
	$instructions.style.display = 'none';
	$instructionsTouch.style.display = 'block';
}

if(docCookies.hasItem('c_colorCodePref'))
{
	// cookie does exist
	// read c_colorCodePref value and set form input accordingly
	var pref = docCookies.getItem('c_colorCodePref');
	var storedSwatches = JSON.parse(docCookies.getItem('savedSwatchesArray'));
	populateSwatches();

	// update checked input
	if(pref === $hexInput.value)
	{
		colorCodePref = pref;
		$hexInput.setAttribute('checked', 'checked');
		$rgbInput.removeAttribute('checked');
		updateLabel(hexValue);
	}
	else if(pref === $rgbInput.value)
	{
		colorCodePref = pref;
		$rgbInput.setAttribute('checked', 'checked');
		$hexInput.removeAttribute('checked');
		updateLabel(hexValue);
	}
}
else
{
	// cookie does not exist
	$panel.style.display = 'block'
	// display popup
	$popupOverlay.style.display = 'block';
	// create cookie c_colorCodePref with the value 'hex'
	setColorCodePref();
}

function setColorCodePref()
{
	if($hexInput.checked)
	{
		colorCodePref = 'hex';
		// update cookie
		docCookies.removeItem('c_colorCodePref');
		docCookies.setItem('c_colorCodePref', colorCodePref, 604800);
	}
	else if($rgbInput.checked)
	{
		colorCodePref = 'rgb';
		// update cookie
		docCookies.removeItem('c_colorCodePref');
		docCookies.setItem('c_colorCodePref', colorCodePref, 604800);
	}
	updateLabel(hexValue);
}

function populateSwatches()
{
	// populate swatches
	if(storedSwatches !== null)
	{
		for(var i = 0; i < storedSwatches.length; i++)
		{
			saveColor(storedSwatches[i]);
		}

		if(savedSwatchesArray.length > 0)
		{
			$noSavedColorsLabel.style.display = 'none';
		}
	}
}

function saveColor(hexValue)
{
	if(hexValue !== lastSavedColor)
	{
		// create new div node and append into savedColors
		var swatch = document.createElement('span');
		swatch.className = 'swatch';
		swatch.dataset.hex = hexValue;
		swatch.style.backgroundColor = hexValue;
		swatch.innerHTML = '<i class="fa fa-times-circle-o swatchCloseBtn hide"></i>'
		$scrollWrapper.appendChild(swatch);
		$panel.style.display = 'block';
		var width = $scrollWrapper.scrollWidth;
		$scrollWrapper.scrollLeft += width;
		$panelToggleBtn.style.top = '-30px';
		lastSavedColor = hexValue;

		savedSwatchesArray.push(hexValue);
		docCookies.setItem('savedSwatchesArray', JSON.stringify(savedSwatchesArray), 604800);
	}
}

function getNewColor()
{
	generateRandomHex();
	setColor(hexValue);
	updateLabel(hexValue);
}
getNewColor();


function generateRandomHex()
{
	hexValue = '#'
	for( var i = 0; i < 6; i++)
	{
		randomSelection = options[Math.floor(Math.random() * options.length)];
		hexValue += randomSelection;
	}
}

function updateLabel(hexValue)
{
	if(colorCodePref === 'hex')
	{
		$colorCodeLabel.innerHTML = hexValue + '<i id="copyBtn" class="fa fa-copy"></i>';
		$colorCodeLabel.setAttribute('data-clipboard-text', hexValue.toUpperCase());
	}
	else if(colorCodePref === 'rgb')
	{
		var rgbValue = document.body.style.backgroundColor;
		$colorCodeLabel.innerHTML = rgbValue  + '<i id="copyBtn" class="fa fa-copy"></i>';
		$colorCodeLabel.setAttribute('data-clipboard-text', rgbValue.toUpperCase());
	}
}

function setColor(hexValue)
{
	document.body.style.backgroundColor = hexValue;
}

function togglePanel()
{
	// If panel is open, close it
	if($panel.style.display === 'none')
	{
		$panelToggleBtn.style.top = '-30px';
		$panel.style.display = 'block';
	}
	else
	{
		$panelToggleBtn.style.top = '0';
		$panel.style.display = 'none';
	}
}

function toggleInfo()
{
	// If infoContent popup is open, close it
	if($popupOverlay.style.display === 'none')
	{
		$popupOverlay.style.display = 'block';
	}
	else
	{
		$popupOverlay.style.display = 'none';
	}
}

function closeAllTheThings()
{
	$panel.style.display = 'none';
	$panelToggleBtn.style.top = '0';
	$popupOverlay.style.display = 'none';
}

function swatchClicked(e)
{
	// return (e.target && e.target.nodeName == 'SPAN') ? true : false;
	if(e.target && e.target.nodeName === 'SPAN')
	{
		console.log('swatchClicked be true');
		return true;
	}
	else
	{
		console.log('swatchClicked be false');
		return false;
	}
}

function showSwatchDetails(e)
{
	var hexValue = e.target.getAttribute('data-hex');
	setColor(hexValue);
	updateLabel(hexValue);
}

function swatchCloseBtnClicked(e)
{
	// return (e.target && e.target.nodeName == 'I') ? true : false;
	if(e.target.nodeName == 'I')
	{
		console.log('swatchCloseBtnClicked be true');
		return true;
	}
	else
	{
		console.log('swatchCloseBtnClicked be false');
		return false;
	}
}

function removeSwatch(e)
{
	var $swatch = e.target.parentNode;
	var hexValue = $swatch.getAttribute('data-hex');
	for( var i = 0; i < savedSwatchesArray.length; i++)
	{
		if(savedSwatchesArray[i] === hexValue)
		{
			$scrollWrapper.removeChild($swatch);

			console.log(savedSwatchesArray);
			savedSwatchesArray.splice(i, 1);
			console.log(savedSwatchesArray);
			docCookies.setItem('savedSwatchesArray', JSON.stringify(savedSwatchesArray), 604800);
		}
	}

	if(savedSwatchesArray.length == 0)
	{
		$noSavedColorsLabel.style.display = 'block';
	}

	lastSavedColor = '';
}

function toggleSwatchCloseBtn(e)
{
	if(e.target && e.target.nodeName == 'SPAN')
	{
		var i = e.target.getElementsByTagName('i')[0];
		if(i.style.display === 'none')
		{
			console.log('over');
			i.style.display = 'inline-block';
		}
		else if(i.style.display === 'inline-block')
		{
			console.log('out');
			i.style.display = 'none';
		}
	}
}

function toggleSwatchCloseBtn(e)
{
	console.log('toggleSwatchCloseBtn');
	var i = e.target.getElementsByTagName('i')[0];
	if(i.classList.contains('hide'))
	{
		console.log('over');
		i.classList.remove('hide');
		i.classList.add('show');
	}
	else if(i.classList.contains('show'))
	{
		console.log('out');
		i.classList.remove('show');
		i.classList.add('hide');
	}
}

function showSwatchCloseBtn(e)
{
	var i = e.target.getElementsByTagName('i')[0];
	i.classList.remove('hide');
	i.classList.add('show');
}

function hideSwatchCloseBtn(e)
{
	var i = e.target.getElementsByTagName('i')[0];
	i.classList.remove('show');
	i.classList.add('hide');
}


function toggleLightShowMode()
{
	if($LightShowFoSho.checked)
	{
		console.log('checked');
		LightShow = setInterval(getNewColor, 100);
	}
	else
	{
		console.log('unchecked');
		clearInterval(LightShow);
	}
}


$hexInput.onchange = setColorCodePref;
$rgbInput.onchange = setColorCodePref;
$LightShowFoSho.onchange = toggleLightShowMode;

window.addEventListener('keyup', registerKeyPress, false);

$bgBtn.addEventListener('click', getNewColor, false);
$infoBtn.addEventListener('mousedown', toggleInfo, false);
$panelToggleBtn.addEventListener('click', togglePanel, false);




$closeBtn.addEventListener('click', function(e)
{
	e.stopPropagation();
	toggleInfo();
}, false);

$popupOverlay.addEventListener('click', function(e)
{
	if(e.target == this)
	{
		toggleInfo();
	}
}, false);





$scrollWrapper.addEventListener('click', function(e)
{
	// e.stopPropagation();
	if(swatchClicked(e))
	{
		showSwatchDetails(e);
	}
}, false);

$scrollWrapper.addEventListener('click', function(e)
{
	// e.stopPropagation();
	if(swatchCloseBtnClicked(e))
	{
		removeSwatch(e);
	}
}, false);

// $scrollWrapper.addEventListener('click', function(e)
// {
// 	if(swatchCloseBtnClicked(e))
// 	{
// 		removeSwatch(e);
// 	}
// 	else if(swatchClicked(e))
// 	{
// 		showSwatchDetails(e);
// 	}
// }, false);

// $scrollWrapper.addEventListener('mouseover', function(e)
// {
// 	if (!e) var e = window.event;
// 	var tg = (window.event) ? e.srcElement : e.target;
// 	if (tg.nodeName != 'SPAN') return;
// 	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
// 	while (reltg != tg && reltg.nodeName != 'BODY')
// 		reltg= reltg.parentNode
// 	if (reltg== tg) return;


// 	if(e.target && e.target.nodeName == 'SPAN' || e.target && e.target.nodeName == 'I')
// 	{	
// 		showSwatchCloseBtn(e);
// 	}
// }, false);

// $scrollWrapper.addEventListener('mouseout', function(e)
// {
// 	if (!e) var e = window.event;
// 	var tg = (window.event) ? e.srcElement : e.target;
// 	if (tg.nodeName != 'SPAN') return;
// 	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
// 	while (reltg != tg && reltg.nodeName != 'BODY')
// 		reltg= reltg.parentNode
// 	if (reltg== tg) return;

// 	hideSwatchCloseBtn(e);

// 	// if(e.target && e.target.nodeName == 'SPAN')
// 	// {
// 	// 	hideSwatchCloseBtn(e);
// 	// }
// }, false);












