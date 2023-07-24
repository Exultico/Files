document.getElementById("calculateBtn").addEventListener("click", function() {
      const verbalScore = parseFloat(document.getElementById("verbal").value);
      const decisionScore = parseFloat(document.getElementById("decision").value);
      const quantitativeScore = parseFloat(document.getElementById("quantitative").value);
      const abstractScore = parseFloat(document.getElementById("abstract").value);
      const situationalBand = parseFloat(document.getElementById("situational").value);

      if (isNaN(verbalScore) || isNaN(decisionScore) || isNaN(quantitativeScore) || isNaN(abstractScore) || isNaN(situationalBand)) {
        alert("Please enter valid scores for all sections.");
        return;
      }

      // UCAT conversion table
      const conversionTable = [
        { score: 300, band1: 0, band2: 0, band3: 0, band4: 0 },
        { score: 330, band1: 14, band2: 6, band3: 5, band4: 4 },
        { score: 350, band1: 18, band2: 8, band3: 7, band4: 5 },
        { score: 380, band1: 20, band2: 9, band3: 9, band4: 6 },
        { score: 400, band1: 25, band2: 11, band3: 11, band4: 7 },
        { score: 430, band1: 27, band2: 12, band3: 12, band4: 8 },
        { score: 450, band1: 32, band2: 14, band3: 14, band4: 9 },
        { score: 480, band1: 34, band2: 15, band3: 16, band4: 10 },
        { score: 500, band1: 39, band2: 17, band3: 18, band4: 11 },
        { score: 530, band1: 41, band2: 18, band3: 20, band4: 12 },
        { score: 550, band1: 45, band2: 20, band3: 22, band4: 13 },
        { score: 580, band1: 48, band2: 21, band3: 23, band4: 14 },
        { score: 600, band1: 52, band2: 23, band3: 25, band4: 15 },
        { score: 630, band1: 55, band2: 24, band3: 27, band4: 16 },
        { score: 650, band1: 59, band2: 26, band3: 29, band4: 17 },
        { score: 680, band1: 61, band2: 27, band3: 31, band4: 18 },
        { score: 700, band1: 66, band2: 29, band3: 32, band4: 19 },
        { score: 730, band1: 68, band2: 30, band3: 34, band4: 20 },
        { score: 750, band1: 73, band2: 32, band3: 36, band4: 21 },
        { score: 780, band1: 75, band2: 33, band3: 38, band4: 22 },
        { score: 800, band1: 80, band2: 35, band3: 41, band4: 23 },
        { score: 830, band1: 82, band2: 36, band3: 43, band4: 24 },
        { score: 850, band1: 86, band2: 38, band3: 44, band4: 25 },
        { score: 880, band1: 89, band2: 39, band3: 45, band4: 26 },
        { score: 900, band1: 93, band2: 41, band3: 47, band4: 27 }
      ];

      const getPercentageFromBand = (band) => {
        if (band === 1) return conversionTable[situationalBand - 1].band1;
        if (band === 2) return conversionTable[situationalBand - 1].band2;
        if (band === 3) return conversionTable[situationalBand - 1].band3;
        if (band === 4) return conversionTable[situationalBand - 1].band4;
        return 0;
      };

      const getUCATScore = (score) => {
        for (let i = 0; i < conversionTable.length; i++) {
          if (score < conversionTable[i].score) {
            const prev = conversionTable[i - 1];
            const next = conversionTable[i];
            const weight = (score - prev.score) / (next.score - prev.score);
            return (1 - weight) * getPercentageFromBand(prev.band1)
              + weight * getPercentageFromBand(next.band1);
          }
        }
        return 0;
      };

      const totalScore = verbalScore + decisionScore + quantitativeScore + abstractScore;
      const situationalPercentage = getPercentageFromBand(situationalBand);
      const ucatScore = (totalScore / 4) * (situationalPercentage / 100);

      const resultElement = document.getElementById("result");
      resultElement.textContent = `Your UCAT Scaled Score is: ${ucatScore.toFixed(2)}`;
    });
