if (CM.Config.ToolWarnCaut == 1) {
  var warn = CM.Cache.Lucky;
  if (CM.Config.ToolWarnCautBon == 1) {
    var bonusNoFren = bonus;
    bonusNoFren /= CM.Sim.getCPSBuffMult();
    warn += ((bonusNoFren * 60 * 15) / 0.15);
  }
  var caut = warn * 7;
  var amount = (Game.cookies + CM.Disp.GetWrinkConfigBank()) - price;
  if ((amount < warn || amount < caut) && (CM.Disp.tooltipType != 'b' || Game.buyMode == 1)) {
    if (CM.Config.ToolWarnCautPos == 0) {
      CM.Disp.TooltipWarnCaut.style.right = '0px';
    }
    else {
      CM.Disp.TooltipWarnCaut.style.top = (l('tooltip').offsetHeight) + 'px';
    }
    CM.Disp.TooltipWarnCaut.style.width = (l('tooltip').offsetWidth - 6) + 'px';

    if (amount < warn) {
      l('CMDispTooltipWarn').style.display = '';
      l('CMDispTooltipWarnText').textContent = Beautify(warn - amount) + ' (' + CM.Disp.FormatTime((warn - amount) / CM.Disp.GetCPS()) + ')';
      l('CMDispTooltipCaut').style.display = '';
      l('CMDispTooltipCautText').textContent = Beautify(caut - amount) + ' (' + CM.Disp.FormatTime((caut - amount) / CM.Disp.GetCPS()) + ')';
    }
    else if (amount < caut) {
      l('CMDispTooltipCaut').style.display = '';
      l('CMDispTooltipCautText').textContent = Beautify(caut - amount) + ' (' + CM.Disp.FormatTime((caut - amount) / CM.Disp.GetCPS()) + ')';
      l('CMDispTooltipWarn').style.display = 'none';
    }
    else {
      l('CMDispTooltipWarn').style.display = 'none';
      l('CMDispTooltipCaut').style.display = 'none';
    }
  }
  else {
    l('CMDispTooltipWarn').style.display = 'none';
    l('CMDispTooltipCaut').style.display = 'none';
  }
}
}
else { // Grimoire
l('CMDispTooltipWarn').style.display = 'none';
l('CMDispTooltipCaut').style.display = 'none';

var minigame = Game.Objects['Wizard tower'].minigame;
var spellCost = minigame.getSpellCost(minigame.spellsById[CM.Disp.tooltipName]);

if (CM.Config.Tooltip == 1 && spellCost <= minigame.magicM) {
  l('CMTooltipArea').innerHTML = '';

  l('tooltip').firstChild.style.paddingBottom = '4px';
  var tooltip = document.createElement('div');
  tooltip.style.border = '1px solid';
  tooltip.style.padding = '4px';
  tooltip.style.margin = '0px -4px';
  tooltip.id = 'CMTooltipBorder';
  tooltip.className = CM.Disp.colorTextPre + CM.Disp.colorGray;

  var header = function(text) {
    var div = document.createElement('div');
    div.style.fontWeight = 'bold';
    div.className = CM.Disp.colorTextPre + CM.Disp.colorBlue;
    div.textContent = text;
    return div;
  }

  tooltip.appendChild(header('Time Left'));
  var time = document.createElement('div');
  time.id = 'CMTooltipTime';
  tooltip.appendChild(time);
  var timeColor = CM.Disp.GetTimeColor(spellCost, minigame.magic, undefined, CM.Disp.CalculateGrimoireRefillTime(minigame.magic, minigame.magicM, spellCost));
  time.textContent = timeColor.text;
  time.className = CM.Disp.colorTextPre + timeColor.color;

  if (spellCost <= minigame.magic) {
    tooltip.appendChild(header('Recover Time'));
    var recover = document.createElement('div');
    recover.id = 'CMTooltipRecover';
    tooltip.appendChild(recover);
    var recoverColor = CM.Disp.GetTimeColor(minigame.magic, Math.max(0, minigame.magic - spellCost), undefined, CM.Disp.CalculateGrimoireRefillTime(Math.max(0, minigame.magic - spellCost), minigame.magicM, minigame.magic));
    recover.textContent = recoverColor.text;
    recover.className = CM.Disp.colorTextPre + recoverColor.color;
  }

  l('CMTooltipArea').appendChild(tooltip);
}
}
}
