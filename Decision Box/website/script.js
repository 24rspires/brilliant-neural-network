var LEDStatus = {
	ON: true,
	OFF: false,
};
var ledLit = (laserStrengths, sensorBias) => {
	var totalInput = 0;
	for (
		var _i = 0, laserStrengths_1 = laserStrengths;
		_i < laserStrengths_1.length;
		_i++
	) {
		var laserStrength = laserStrengths_1[_i];
		totalInput += laserStrength;
	}
	if (totalInput >= sensorBias) return LEDStatus.ON;
	else return LEDStatus.OFF;
};

$("#bulb-label").text("Bulb Bias (" + $("#bulbBias").val() + ")");

$("#bulbBias").on("input", () => {
	$("#bulb-label").text("Bulb Bias (" + $("#bulbBias").val() + ")");
});

$("#numLasers").on("input", () => {
	if ($("#numLasers").val() !== "") {
		const bulbVal = $("#bulbBias").val();
		$("#bulbBias").replaceWith(
			`<input type="range" min"0" max="${
				$("#numLasers").val() * 20
			}" value="${Math.min(
				Math.max(0, bulbVal),
				$("#numLasers").val() * 20
			)}" id="bulbBias" />`
		);
		$("#bulb-label").text("Bulb Bias (" + $("#bulbBias").val() + ")");
		$("#bulbBias").on("input", () => {
			$("#bulb-label").text("Bulb Bias (" + $("#bulbBias").val() + ")");
			let laserStrengths = [];
			$(".laser").each((index, laser) => {
				laserStrengths.push(parseInt($(laser).val()));
			});
			if (ledLit(laserStrengths, $("#bulbBias").val())) {
				$("#bulbstatus").text("ON");
				$("#bulbstatus").css("color", "green");
			} else {
				$("#bulbstatus").text("OFF");
				$("#bulbstatus").css("color", "red");
			}
		});
	}
	$("#laser-section").empty();

	for (let i = 0; i < $("#numLasers").val(); i++) {
		let label = document.createElement("label");
		let span = document.createElement("span");
		let laser = document.createElement("input");
		$(laser).attr("id", `laser${i}`);
		$(span).text(`Laser ${i + 1} (000)`);
		$(laser).attr("type", "range");
		$(laser).attr("min", "0");
		$(laser).attr("max", "10");
		$(laser).attr("value", "0");
		$(laser).attr("class", "laser");
		$(laser).on("input", () => {
			let val = $(laser).val();
			if (val.length == 1) val = "00" + val;
			else if (val.length == 2) val = "0" + val;
			$(span).text("Laser " + (i + 1) + " (" + val + ")");
			let laserStrengths = [];
			$(".laser").each((index, laser) => {
				laserStrengths.push(parseInt($(laser).val()));
			});
			if (ledLit(laserStrengths, $("#bulbBias").val())) {
				$("#bulbstatus").text("ON");
				$("#bulbstatus").css("color", "green");
			} else {
				$("#bulbstatus").text("OFF");
				$("#bulbstatus").css("color", "red");
			}
		});
		$(label).append(span);
		$(label).append(laser);
		$("#laser-section").append(label);
		$("#laser-section").append("<br />");
	}
});
