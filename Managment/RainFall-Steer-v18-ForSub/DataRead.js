function Cities() {
  for (var i = 1; i < dataSelected.length - 1; i++) {
    data = dataSelected[i].split(/,/);
    if (int(data[1]) == yearD) {
      if (i % 12 == 0) {
        var rad = map(int(data[37]), 0, 3001, 0, 20);

        avarage.push(rad);
        mounthOut = data[2];
        yarOut = data[1];

        clon = 90.3811;
        clat = 23.5349;
        lon = data[35];
        lat = data[34];
        cx = mercX(clon);
        cy = mercY(clat);
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        cName.push(data[0]);
        att.push(createVector(x, y));

      }
      if (readCityAve) {
        var newAv = map(int(data[36]), 0, 3001, 0, 116);
        cityAve.push([newAv, data[0], data[2]]);
      }
    } else if (int(data[1]) == 1991 || int(data[1]) == 2001 || int(data[1]) == 2011) {
      if (i % 12 == 0) {
        var newRad = map(int(data[37]), 0, 6095, 0, 60);
        threeYearsAva.push([data[0], data[1], newRad, int(data[37])])
      }
    }
  }
  if (readCityPop) {
    for (var j = 4; j < population.length - 1; j++) {
      pData = population[j].split(/,/);
      pCityName[j] = pData[0];
      if (int(pData[9]) > 0) {
        totalPopsVar[1] = int(pData[9]);
        totalPopsVar[2] = int(pData[10]);
        totalPopsVar[3] = int(pData[11]);
      }
      pPop.push([pData[0], int(pData[3]), int(pData[4]), int(pData[5]), int(pData[6]), int(pData[7]), int(pData[8])]);
    }
  }
  readCityPop = false;

}