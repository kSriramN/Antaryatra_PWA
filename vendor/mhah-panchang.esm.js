var corr = function corr(mlcor, mscor, fcor, dcor, lcor) {
  this.mlcor = mlcor;
  this.mscor = mscor;
  this.fcor = fcor;
  this.dcor = dcor;
  this.lcor = lcor;
};
var corr2 = function corr2(l, ml, ms, f, d) {
  this.l = l;
  this.ml = ml;
  this.ms = ms;
  this.f = f;
  this.d = d;
};

var MhahMoonOutragConst = function MhahMoonOutragConst() {
  //---------------------------------------------------------------------------
  // Data on the Moon outrage in length.
  //---------------------------------------------------------------------------
  this.corrMoon = [new corr(0, 0, 0, 4, 13.902), new corr(0, 0, 0, 2, 2369.912), new corr(1, 0, 0, 4, 1.979), new corr(1, 0, 0, 2, 191.953), new corr(1, 0, 0, 0, 22639.5), new corr(1, 0, 0, -2, -4586.465), new corr(1, 0, 0, -4, -38.428), new corr(1, 0, 0, -6, -0.393), new corr(0, 1, 0, 4, -0.289), new corr(0, 1, 0, 2, -24.42), new corr(0, 1, 0, 0, -668.146), new corr(0, 1, 0, -2, -165.145), new corr(0, 1, 0, -4, -1.877), new corr(0, 0, 0, 3, 0.403), new corr(0, 0, 0, 1, -125.154), new corr(2, 0, 0, 4, 0.213), new corr(2, 0, 0, 2, 14.387), new corr(2, 0, 0, 0, 769.016), new corr(2, 0, 0, -2, -211.656), new corr(2, 0, 0, -4, -30.773), new corr(2, 0, 0, -6, -0.57), new corr(1, 1, 0, 2, -2.921), new corr(1, 1, 0, 0, -109.673), new corr(1, 1, 0, -2, -205.962), new corr(1, 1, 0, -4, -4.391), new corr(1, -1, 0, 4, 0.283), new corr(1, -1, 0, 2, 14.577), new corr(1, -1, 0, 0, 147.687), new corr(1, -1, 0, -2, 28.475), new corr(1, -1, 0, -4, 0.636), new corr(0, 2, 0, 2, -0.189), new corr(0, 2, 0, 0, -7.486), new corr(0, 2, 0, -2, -8.096), new corr(0, 0, 2, 2, -5.741), new corr(0, 0, 2, 0, -411.608), new corr(0, 0, 2, -2, -55.173), new corr(0, 0, 2, -4, 0.025), new corr(1, 0, 0, 1, -8.466), new corr(1, 0, 0, -1, 18.609), new corr(1, 0, 0, -3, 3.215), new corr(0, 1, 0, 1, 18.023), new corr(0, 1, 0, -1, 0.56), new corr(3, 0, 0, 2, 1.06), new corr(3, 0, 0, 0, 36.124), new corr(3, 0, 0, -2, -13.193), new corr(3, 0, 0, -4, -1.187), new corr(3, 0, 0, -6, -0.293), new corr(2, 1, 0, 2, -0.29), new corr(2, 1, 0, 0, -7.649), new corr(2, 1, 0, -2, -8.627), new corr(2, 1, 0, -4, -2.74), new corr(2, -1, 0, 2, 1.181), new corr(2, -1, 0, 0, 9.703), new corr(2, -1, 0, -2, -2.494), new corr(2, -1, 0, -4, 0.36), new corr(1, 2, 0, 0, -1.167), new corr(1, 2, 0, -2, -7.412), new corr(1, 2, 0, -4, -0.311), new corr(1, -2, 0, 2, 0.757), new corr(1, -2, 0, 0, 2.58), new corr(1, -2, 0, -2, 2.533), new corr(0, 3, 0, -2, -0.344), new corr(1, 0, 2, 2, -0.992), new corr(1, 0, 2, 0, -45.099), new corr(1, 0, 2, -2, -0.179), new corr(1, 0, -2, 2, -6.382), new corr(1, 0, -2, 0, 39.528), new corr(1, 0, -2, -2, 9.366), new corr(0, 1, 2, 0, 0.415), new corr(0, 1, 2, -2, -2.152), new corr(0, 1, -2, 2, -1.44), new corr(0, 1, -2, -2, 0.384), new corr(2, 0, 0, 1, -0.586), new corr(2, 0, 0, -1, 1.75), new corr(2, 0, 0, -3, 1.225), new corr(1, 1, 0, 1, 1.267), new corr(1, -1, 0, -1, -1.089), new corr(0, 0, 2, -1, 0.584), new corr(4, 0, 0, 0, 1.938), new corr(4, 0, 0, -2, -0.952), new corr(3, 1, 0, 0, -0.551), new corr(3, 1, 0, -2, -0.482), new corr(3, -1, 0, 0, 0.681), new corr(2, 0, 2, 0, -3.996), new corr(2, 0, 2, -2, 0.557), new corr(2, 0, -2, 2, -0.459), new corr(2, 0, -2, 0, -1.298), new corr(2, 0, -2, -2, 0.538), new corr(1, 1, -2, -2, 0.426), new corr(1, -1, 2, 0, -0.304), new corr(1, -1, -2, 2, -0.372), new corr(0, 0, 4, 0, 0.418), new corr(2, -1, 0, -1, -0.352)]; // l, ml, ms, f, d
  //corrMoon2 = new Array(); // additional

  this.corrMoon2 = [new corr2(0.127, 0, 0, 0, 6), new corr2(-0.151, 0, 2, 0, -4), new corr2(-0.085, 0, 0, 2, 4), new corr2(0.15, 0, 1, 0, 3), new corr2(-0.091, 2, 1, 0, -6), new corr2(-0.103, 0, 3, 0, 0), new corr2(-0.301, 1, 0, 2, -4), new corr2(0.202, 1, 0, -2, -4), new corr2(0.137, 1, 1, 0, -1), new corr2(0.233, 1, 1, 0, -3), new corr2(-0.122, 1, -1, 0, 1), new corr2(-0.276, 1, -1, 0, -3), new corr2(0.255, 0, 0, 2, 1), new corr2(0.254, 0, 0, 2, -3), new corr2(-0.1, 3, 1, 0, -4), new corr2(-0.183, 3, -1, 0, -2), new corr2(-0.297, 2, 2, 0, -2), new corr2(-0.161, 2, 2, 0, -4), new corr2(0.197, 2, -2, 0, 0), new corr2(0.254, 2, -2, 0, -2), new corr2(-0.25, 1, 3, 0, -2), new corr2(-0.123, 2, 0, 2, 2), new corr2(0.173, 2, 0, -2, -4), new corr2(0.263, 1, 1, 2, 0), new corr2(0.13, 3, 0, 0, -1), new corr2(0.113, 5, 0, 0, 0), new corr2(0.092, 3, 0, 2, -2)];
};

var MhahPanchangImpl = /*#__PURE__*/function () {
  function MhahPanchangImpl(mhahConstant) {
    this.mhahConstant = mhahConstant;
    this.mhahMoonOutragConst = new MhahMoonOutragConst();
    this.d2r = Math.PI / 180;
    this.r2d = 180 / Math.PI;
    this.range = [1, 31, 0, 0, -3000, 4000, 0, 23, 0, 59, -12, 12, 0, 59];
    this.tipnaks = [2, 5, 6, 0, 1, 4, 3, 2, 4, 5, 5, 0, 2, 1, 3, 6, 1, 4, 4, 5, 0, 3, 3, 3, 5, 0, 1];
    this.ayanamsa = 0;
  }

  var _proto = MhahPanchangImpl.prototype;

  _proto.daysInMonth = function daysInMonth(m, y) {
    var g_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) g_days[1] = 29;
    return g_days[m];
  } //-----------------------------------------------------------------------------------
  // Calculating geotsent p avoid longitude Moon and angular sector p News.
  // (2 sec accuracy. longitude)
  //-----------------------------------------------------------------------------------
  ;

  _proto.moon = function moon(jd) {
    // days from 1900
    var tdays = jd - 2415020;
    var t = tdays / 36525;
    var t2 = t * t;
    var t3 = t * t * t; // slope travels to the equator
    //let ob = 23.452294 - 0.0130125 * t - 0.00000164 * t2 + 0.000000503 * t3;
    // the average length moon

    var l = 270.4337361 + 13.176396544528099 * tdays - 5.86 * t2 / 3600 + 0.0068 * t3 / 3600; // the difference medium length Moon and the Sun (the averageElongation Moon):

    var d = 350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3 + 0.0000018888889 * t3; // Perigee moon

    var pe = 334.329556 + 14648522.52 * t / 3600 - 37.17 * t2 / 3600 - 0.045 * t3 / 3600; // the average anomoly sun

    var ms = 358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4 - t3 * 3.3333333623078e-6; // The average anomoloy moon
    //ml = 296.1046083333757 + 477198.8491083336*t + 0.0091916667090522*t2 + 0.0000143888893*t3;

    var ml = this.fix360(l - pe); // Rising length node orbit the moon:

    var om = 259.183275 - 6962911.23 * t / 3600 + 7.48 * t2 / 3600 + 0.008 * t3 / 3600; // the average length Moon, measured from the bottom up hub orbit:

    var f = this.fix360(l - om); // periodic revisions

    var r2rad = 360.0 * this.d2r;
    var tb = tdays * 1e-12; // *10^12

    var t2c = tdays * tdays * 1e-16; // *10^16

    var a1 = Math.sin(r2rad * (0.53733431 - 10104982 * tb + 191 * t2c));
    var a2 = Math.sin(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    var c2 = Math.cos(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    var a3 = Math.sin(r2rad * (0.14222222 + 1536238 * tb));
    var a4 = Math.sin(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    var c4 = Math.cos(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    var a5 = Math.sin(r2rad * (0.52453688 - 147162675 * tb + 43 * t2c));
    var a6 = Math.sin(r2rad * (0.84536324 - 11459387 * tb));
    var a7 = Math.sin(r2rad * (0.23363774 + 1232723 * tb + 191 * t2c));
    var a8 = Math.sin(r2rad * (0.5875 + 9050118 * tb));
    var a9 = Math.sin(r2rad * (0.61043085 - 67718733 * tb));
    var dlm = 0.84 * a3 + 0.31 * a7 + 14.27 * a1 + 7.261 * a2 + 0.282 * a4 + 0.237 * a6;
    var dpm = -2.1 * a3 - 2.076 * a2 - 0.84 * a4 - 0.593 * a6;
    var dkm = 0.63 * a3 + 95.96 * a2 + 15.58 * a4 + 1.86 * a5;
    var dls = -6.4 * a3 - 0.27 * a8 - 1.89 * a6 + 0.2 * a9;
    var dgc = (-4.318 * c2 - 0.698 * c4) / 3600.0 / 360.0;
    dgc = 1.000002708 + 139.978 * dgc;
    ml = this.d2r * (ml + (dlm - dpm) / 3600.0); //Average anomoly moon

    ms = this.d2r * (ms + dls / 3600.0); //Average anomoly sun

    f = this.d2r * (f + (dlm - dkm) / 3600.0);
    d = this.d2r * (d + (dlm - dls) / 3600.0); //avg elongation moon

    var lk = 0;
    var lk1 = 0;
    var i1corr = 1.0 - 6.832e-8 * tdays;
    var i2corr = dgc * dgc;

    for (var i = 0; i < 93; i++) {
      // outrage at length
      var arg = this.mhahMoonOutragConst.corrMoon[i].mlcor * ml + this.mhahMoonOutragConst.corrMoon[i].mscor * ms + this.mhahMoonOutragConst.corrMoon[i].fcor * f + this.mhahMoonOutragConst.corrMoon[i].dcor * d;
      var sinarg = Math.sin(arg);

      if (this.mhahMoonOutragConst.corrMoon[i].mscor !== 0) {
        sinarg *= i1corr;
        if (this.mhahMoonOutragConst.corrMoon[i].mscor === 2 || this.mhahMoonOutragConst.corrMoon[i].mscor === -2) sinarg *= i1corr;
      }

      if (this.mhahMoonOutragConst.corrMoon[i].fcor !== 0) sinarg *= i2corr;
      lk += this.mhahMoonOutragConst.corrMoon[i].lcor * sinarg;
    }

    for (var _i = 0; _i < 27; _i++) {
      // outrage at length additional
      var _arg = this.mhahMoonOutragConst.corrMoon2[_i].ml * ml + this.mhahMoonOutragConst.corrMoon2[_i].ms * ms + this.mhahMoonOutragConst.corrMoon2[_i].f * f + this.mhahMoonOutragConst.corrMoon2[_i].d * d;

      var _sinarg = Math.sin(_arg);

      lk1 += this.mhahMoonOutragConst.corrMoon2[_i].l * _sinarg;
    } // resentments of the planets


    var dlid = 0.822 * Math.sin(r2rad * (0.3248 - 0.0017125594 * tdays));
    dlid += 0.307 * Math.sin(r2rad * (0.14905 - 0.0034251187 * tdays));
    dlid += 0.348 * Math.sin(r2rad * (0.68266 - 0.0006873156 * tdays));
    dlid += 0.662 * Math.sin(r2rad * (0.65162 + 0.0365724168 * tdays));
    dlid += 0.643 * Math.sin(r2rad * (0.88098 - 0.0025069941 * tdays));
    dlid += 1.137 * Math.sin(r2rad * (0.85823 + 0.036448727 * tdays));
    dlid += 0.436 * Math.sin(r2rad * (0.71892 + 0.036217918 * tdays));
    dlid += 0.327 * Math.sin(r2rad * (0.97639 + 0.000173491 * tdays));
    l = l + this.nutation(jd) + (dlm + lk + lk1 + dlid) / 3600.0;
    this.LmoonYoga = l; //alert("Lmoon="+l);

    l = this.fix360(l); // angular velocity of the moon on ecliptic (deg/day):

    var vl = 13.176397;
    vl = vl + 1.434006 * Math.cos(ml);
    vl = vl + 0.280135 * Math.cos(2 * d);
    vl = vl + 0.251632 * Math.cos(2 * d - ml);
    vl = vl + 0.09742 * Math.cos(2 * ml);
    vl = vl - 0.052799 * Math.cos(2 * f);
    vl = vl + 0.034848 * Math.cos(2 * d + ml);
    vl = vl + 0.018732 * Math.cos(2 * d - ms);
    vl = vl + 0.010316 * Math.cos(2 * d - ms - ml);
    vl = vl + 0.008649 * Math.cos(ms - ml);
    vl = vl - 0.008642 * Math.cos(2 * f + ml);
    vl = vl - 0.007471 * Math.cos(ms + ml);
    vl = vl - 0.007387 * Math.cos(d);
    vl = vl + 0.006864 * Math.cos(3 * ml);
    vl = vl + 0.00665 * Math.cos(4 * d - ml);
    vl = vl + 0.003523 * Math.cos(2 * d + 2 * ml);
    vl = vl + 0.003377 * Math.cos(4 * d - 2 * ml);
    vl = vl + 0.003287 * Math.cos(4 * d);
    vl = vl - 0.003193 * Math.cos(ms);
    vl = vl - 0.003003 * Math.cos(2 * d + ms);
    vl = vl + 0.002577 * Math.cos(ml - ms + 2 * d);
    vl = vl - 0.002567 * Math.cos(2 * f - ml);
    vl = vl - 0.001794 * Math.cos(2 * d - 2 * ml);
    vl = vl - 0.001716 * Math.cos(ml - 2 * f - 2 * d);
    vl = vl - 0.001698 * Math.cos(2 * d + ms - ml);
    vl = vl - 0.001415 * Math.cos(2 * d + 2 * f);
    vl = vl + 0.001183 * Math.cos(2 * ml - ms);
    vl = vl + 0.00115 * Math.cos(d + ms);
    vl = vl - 0.001035 * Math.cos(d + ml);
    vl = vl - 0.001019 * Math.cos(2 * f + 2 * ml);
    vl = vl - 0.001006 * Math.cos(ms + 2 * ml);
    this.skor = vl; //l += ay;
    //if(l < 0.0)l += 360.0;

    return l;
  } //----------------------------------------------------------------------
  // Calculating geotsent p avoid longitude Sun.
  // (the acuracy of 1 sec . longitude)
  //----------------------------------------------------------------------
  ;

  _proto.sun = function sun(jd) {
    // days frm 1900:
    var tdays = jd - 2415020;
    var t = tdays / 36525;
    var t2 = t * t;
    var t3 = t * t * t; // the avg len sun

    var ls = 279.696678 + 0.9856473354 * tdays + 1.089 * t2 / 3600; // perigee sun

    var pes = 101.220833 + 6189.03 * t / 3600 + 1.63 * t2 / 3600 + 0.012 * t3 / 3600; // avg anomoly sun

    var ms = this.fix360(ls - pes + 180);
    var g = ms + (0.266 * Math.sin((31.8 + 119.0 * t) * this.d2r) + 6.4 * Math.sin((231.19 + 20.2 * t) * this.d2r) + (1.882 - 0.016 * t) * Math.sin((57.24 + 150.27 * t) * this.d2r)) / 3600.0; // eccentricity orbit sun

    var ex = 0.01675104 - 0.0000418 * t - 0.000000126 * t2; // eccentric anomoloy calculation iterative method

    var u = this.kepler(g, ex, 0.0000003); // cal true anomaly sun

    var truanom;
    var b = Math.sqrt((1 + ex) / (1 - ex));
    if (Math.abs(Math.PI - u) < 1.0e-10) truanom = u;else truanom = 2.0 * Math.atan(b * Math.tan(u / 2));
    truanom = this.fix360(truanom * this.r2d); //corrections for cal of longitude and radius vector

    var u1 = (153.23 + 22518.7541 * t) * this.d2r;
    var u2 = (216.57 + 45037.5082 * t) * this.d2r;
    var u3 = (312.69 + 32964.3577 * t) * this.d2r;
    var u4 = (350.74 + 445267.1142 * t - 0.00144 * t2) * this.d2r;
    var u6 = (353.4 + 65928.71550000001 * t) * this.d2r;
    var u5 = (315.6 + 893.3 * t) * this.d2r;
    var dl = 0.00134 * Math.cos(u1);
    dl += 0.00154 * Math.cos(u2);
    dl += 0.002 * Math.cos(u3);
    dl += 0.00179 * Math.sin(u4);
    dl += 0.202 * Math.sin(u5) / 3600;
    var dr = 0.00000543 * Math.sin(u1);
    dr += 0.00001575 * Math.sin(u2);
    dr += 0.00001627 * Math.sin(u3);
    dr += 0.00003076 * Math.cos(u4);
    dr += 9.26999999e-6 * Math.sin(u6); // true len of sun (deg)

    var il = ls + dl + truanom - ms; // corrections to abberations links

    var r1 = 1.0000002 * (1 - ex * ex) / (1 + ex * Math.cos(truanom * this.d2r));
    var rs = r1 + dr; // radius vector

    var ab = 20.496 * (1 - ex * ex) / rs / 3600;
    ls = il + this.nutation(jd) - ab; // app len sun

    this.LsunYoga = ls;
    ls = this.fix360(ls);
    return ls;
  } //----------------------------------------------------------------------------
  // cal start and end of tithi (len = 12)and karana (len = 6)
  //----------------------------------------------------------------------------
  ;

  _proto.tithi = function tithi(jd, n1, tzone, len) {
    var s_t = {};
    var flag;
    var jdt = jd;
    var knv = Math.floor((jd - 2415020) / 365.25 * 12.3685);

    for (var itit = n1; itit < n1 + 2; ++itit) {
      var aspect = len * itit; // sun n moon in the early tithi

      flag = 0;

      if (aspect === 0) {
        jdt = this.novolun(jd, knv);
        flag = 1;
      }

      if (aspect === 360) {
        jdt = this.novolun(jd, knv + 1);
        flag = 1;
      }

      while (flag < 1) {
        var Lsun0 = this.sun(jdt);
        var Lmoon0 = this.moon(jdt);
        var a = this.fix360(Lsun0 + aspect); // pt should be where luna

        var asp1 = a - Lmoon0; // assymptots of the moon to ur point

        if (asp1 > 180) asp1 -= 360;
        if (asp1 < -180) asp1 += 360;
        flag = 1;

        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / (this.skor - 1);
          flag = 0;
        }
      }

      if (itit === n1) s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (itit === n1 + 1) s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }

    return s_t;
  } //----------------------------------------------------------------------------
  // cal entry and exit moon in nakshatra
  //----------------------------------------------------------------------------
  ;

  _proto.nakshatra = function nakshatra(jd, n_naksh, tzone) {
    var s_t = {};
    var flag;
    var jdt = jd;

    for (var inak = n_naksh; inak < n_naksh + 2; ++inak) {
      var n1 = this.fix360(inak * 80 / 6); // co-ordinate start of nakshatra

      flag = 0;

      while (flag < 1) {
        var Lmoon0 = this.fix360(this.moon(jdt) + this.ayanamsa);
        var asp1 = n1 - Lmoon0; // distance frm moon before nakshatra(degree)

        if (asp1 > 180) asp1 -= 360;
        if (asp1 < -180) asp1 += 360;
        flag = 1;

        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / this.skor;
          flag = 0;
        }
      }

      if (inak === n_naksh) s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (inak === n_naksh + 1) s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }

    return s_t;
  } //----------------------------------------------------------------------------
  // cal begin and end of yoga
  //----------------------------------------------------------------------------
  ;

  _proto.yoga = function yoga(jd, zyoga, tzone) {
    var s_t = {};
    var flag;
    var jdt = jd;
    var z = zyoga;
    var nn_yoga = new Array(2);
    nn_yoga[0] = Math.floor(z * 6 / 80) * 80 / 6;
    nn_yoga[1] = (Math.floor(z * 6 / 80) + 1) * 80 / 6;

    for (var iyog = 0; iyog < 2; ++iyog) {
      flag = 0;

      while (flag < 1) {
        this.sun(jdt);
        this.moon(jdt);
        var dmoonYoga = this.LmoonYoga + this.ayanamsa - 491143.07698973856;
        var dsunYoga = this.LsunYoga + this.ayanamsa - 36976.91240579201; //alert(LmoonYoga+"\r"+LsunYoga+"\r"+ayanamsa);

        z = dmoonYoga + dsunYoga;
        var asp1 = nn_yoga[iyog] - z;
        flag = 1;

        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / (this.skor + 1.0145616633);
          flag = 0;
        } //if (Math.abs(asp1) > 0.001) {jdt += (asp1 / skor) + (58.13 * Math.sin(asp1*d2r)); flag = 0;}

      }

      if (iyog === 0) s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (iyog === 1) s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }

    return s_t;
  } //-----------------------------------------------------------------------------
  //cal time in the near past novoluna (err less then 2 min)
  //-----------------------------------------------------------------------------
  ;

  _proto.novolun = function novolun(jd, knv) {
    var t = (jd - 2415020) / 36525;
    var t2 = t * t;
    var t3 = t * t * t;
    var jdnv = 2415020.75933 + 29.53058868 * knv + 0.0001178 * t2 - 0.000000155 * t3;
    jdnv += 0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * this.d2r);
    var m = 359.2242 + 29.10535608 * knv - 0.0000333 * t2 - 0.00000347 * t3;
    var ml = 306.0253 + 385.81691806 * knv + 0.0107306 * t2 + 0.00001236 * t3;
    var f = 21.2964 + 390.67050646 * knv - 0.0016528 * t2 - 0.00000239 * t3;
    m *= this.d2r;
    ml *= this.d2r;
    f *= this.d2r;
    var djd = (0.1734 - 0.000393 * t) * Math.sin(m);
    djd += 0.0021 * Math.sin(2 * m);
    djd -= 0.4068 * Math.sin(ml);
    djd += 0.0161 * Math.sin(2 * ml);
    djd -= 0.0004 * Math.sin(3 * ml);
    djd += 0.0104 * Math.sin(2 * f);
    djd -= 0.0051 * Math.sin(m + ml);
    djd -= 0.0074 * Math.sin(m - ml);
    djd += 0.0004 * Math.sin(2 * f + m);
    djd -= 0.0004 * Math.sin(2 * f - m);
    djd -= 0.0006 * Math.sin(2 * f + ml);
    djd += 0.001 * Math.sin(2 * f - ml);
    djd += 0.0005 * Math.sin(m + 2 * ml);
    jdnv += djd;
    return jdnv;
  } //-----------------------------------------------------
  // decision equation kepler (in rad)
  //-----------------------------------------------------
  ;

  _proto.kepler = function kepler(m, ex, err) {
    //val u0, delta;
    m *= this.d2r;
    var u0 = m;
    err *= this.d2r;
    var delta = 1;

    while (Math.abs(delta) >= err) {
      delta = (m + ex * Math.sin(u0) - u0) / (1 - ex * Math.cos(u0));
      u0 += delta;
    }

    return u0;
  } //-----------------------------------------------------
  // cal nutation in len
  //-----------------------------------------------------
  ;

  _proto.nutation = function nutation(jd) {
    var t = (jd - 2415020) / 36525;
    var t2 = t * t; // avg len sun

    var ls = 279.6967 + 36000.7689 * t + 0.000303 * t2; // avg len moon

    var l = 270.4341639 + 481267.8831417 * t - 0.0011333333 * t2; // avg anomaly sun

    var ms = 358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4; // avg anomaly moon

    var ml = 296.1046083333757 + 477198.8491083336 * t + 0.0091916667090522 * t2; // the diff medium len of moon and sun (avg elongation moon)

    var d = 350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3;
    var om = 259.1832750002543 - 1934.142008333206 * t + 0.0020777778 * t2;
    ls *= this.d2r;
    l *= this.d2r;
    ms *= this.d2r;
    ml *= this.d2r;
    d *= this.d2r;
    om *= this.d2r;
    var d2 = d * d;
    var l2 = l * l;
    var ls2 = ls * ls;
    var nut = (-17.2327 - 0.01737 * t) * Math.sin(om);
    nut += 0.2088 * Math.sin(2.0 * om);
    nut += 0.0675 * Math.sin(ml);
    nut -= 0.0149 * Math.sin(ml - d2);
    nut -= 0.0342 * Math.sin(l2 - om);
    nut += 0.0114 * Math.sin(l2 - ml);
    nut -= 0.2037 * Math.sin(l2);
    nut -= 0.0261 * Math.sin(l2 + ml);
    nut += 0.0124 * Math.sin(ls2 - om);
    nut += 0.0214 * Math.sin(ls2 - ms);
    nut -= 1.2729 * Math.sin(ls2);
    nut -= 0.0497 * Math.sin(ls2 + ms);
    nut += 0.1261 * Math.sin(ms);
    nut = nut / 3600.0;
    return nut;
  } //-----------------------------------------------------
  // Calculation ayanamsa (degrees)
  //-----------------------------------------------------
  ;

  _proto.calcayan = function calcayan(jd) {
    var t = (jd - 2415020) / 36525; // avg node len moon

    var om = 259.183275 - 1934.142008333206 * t + 0.0020777778 * t * t + 0.0000022222222 * t * t * t; // avg len sun

    var ls = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
    var aya = 17.23 * Math.sin(this.d2r * om) + 1.27 * Math.sin(this.d2r * ls * 2) - (5025.64 + 1.11 * t) * t;
    aya = (aya - 80861.27) / 3600.0; // 84038.27 = Fagan-Bradley, 80861.27 = Lahiri

    return aya;
  } //------------------------------------------------------------------------------------------
  // cal date by number of date mon and year
  //------------------------------------------------------------------------------------------
  ;

  _proto.mdy2julian = function mdy2julian(m, d, y) {
    var im = 12 * (y + 4800) + m - 3;
    var j = (2 * (im - Math.floor(im / 12) * 12) + 7 + 365 * im) / 12;
    j = Math.floor(j) + d + Math.floor(im / 48) - 32083;
    if (j > 2299171) j += Math.floor(im / 4800) - Math.floor(im / 1200) + 38;
    j -= 0.5;
    return j;
  };

  _proto.dTime = function dTime(jd) {
    var efdt = [124, 85, 62, 48, 37, 26, 16, 10, 9, 10, 11, 11, 12, 13, 15, 16, 17, 17, 13.7, 12.5, 12, 7.5, 5.7, 7.1, 7.9, 1.6, -5.4, -5.9, -2.7, 10.5, 21.2, 24, 24.3, 29.2, 33.2, 40.2, 50.5, 56.9, 65.7, 75.5];
    this.calData(jd);
    var dgod = this.kyear + (this.kmon - 1) / 12 + (this.kday - 1) / 365.25;
    var t = (jd - 2378497) / 36525; // IN centuries rejection of 1800 bc
    //t = (jd - 2415020)/36525; // in cent rejection of 1900 bc

    if (dgod >= 1620 && dgod < 2010) {
      var i1 = Math.floor((dgod - 1620) / 10);
      var di = dgod - (1620 + i1 * 10);
      this.dt = efdt[i1] + (efdt[i1 + 1] - efdt[i1]) * di / 10;
    } else {
      if (dgod >= 2010) this.dt = 25.5 * t * t - 39; //if (dgod >= 2010) dt = 29.949 * t * t - 56.796;
      //if (dgod < 1620) dt = 5 + 24.349 + 72.3165 * t + 29.949 * t * t;

      if (dgod >= 948 && dgod < 1620) this.dt = 25.5 * t * t;
      if (dgod < 948) this.dt = 1361.7 + 320 * t + 44.3 * t * t;
    }

    this.dt /= 3600;
    return this.dt;
  } //------------------------------------------------------------------------------------------
  // cal date on calendar date
  //------------------------------------------------------------------------------------------
  ;

  _proto.calData = function calData(jd) {
    var z1 = jd + 0.5;
    var z2 = Math.floor(z1);
    var f = z1 - z2;
    var a, alf;
    if (z2 < 2299161) a = z2;else {
      alf = Math.floor((z2 - 1867216.25) / 36524.25);
      a = z2 + 1 + alf - Math.floor(alf / 4);
    }
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var days = b - d - Math.floor(30.6001 * e) + f;
    this.kday = Math.floor(days);
    if (e < 13.5) this.kmon = e - 1;else this.kmon = e - 13;
    if (this.kmon > 2.5) this.kyear = c - 4716;
    if (this.kmon < 2.5) this.kyear = c - 4715;
    var hh1 = (days - this.kday) * 24;
    var khr = Math.floor(hh1);
    var kmin = hh1 - khr;
    var ksek = kmin * 60;
    kmin = Math.floor(ksek);
    ksek = Math.floor((ksek - kmin) * 60);
    var s = new Date(this.kyear, this.kmon - 1, this.kday, khr, kmin, ksek, 0);
    return s;
  } //------------------------------------------------------------------------------------------
  // transalation deg logitudinal in degrees,min and sec
  //------------------------------------------------------------------------------------------
  ;

  _proto.lon2dmsz = function lon2dmsz(x) {
    var d, m, s;
    x = Math.abs(x);
    d = Math.floor(x);
    var ss0 = Math.round((x - d) * 3600);
    m = Math.floor(ss0 / 60);
    s = ss0 % 60 % 60;
    d %= 30;
    var str = d + ' ' + m + "'" + s + '" ';
    return str;
  } //------------------------------------------------------------------------------------------
  // translation degrees in deg, min and sec
  //------------------------------------------------------------------------------------------
  ;

  _proto.lon2dms = function lon2dms(x) {
    var d, m, s;
    x = Math.abs(x);
    d = Math.floor(x);
    var ss0 = Math.round((x - d) * 3600);
    m = Math.floor(ss0 / 60);
    s = ss0 % 60 % 60;
    var str = d + ' ' + m + "'" + s + '"';
    return str;
  } //------------------------------------------------------------------------------------------
  // fixing the angle within 360 degrees
  //------------------------------------------------------------------------------------------
  ;

  _proto.fix360 = function fix360(v) {
    while (v < 0.0) {
      v += 360.0;
    }

    while (v > 360.0) {
      v -= 360.0;
    }

    return v;
  } //------------------------------------------------------------------------------------------
  // Day of the Week
  //------------------------------------------------------------------------------------------
  ;

  _proto.weekDay = function weekDay(jd) {
    // Julian date for the begin of the day
    var jd0 = Math.floor(jd) + 0.5;
    if (jd < jd0) jd0 -= 1; // day

    var jdn = jd0 + 1.5;
    var dn1 = Math.floor(jdn / 7) * 7;
    var wday = Math.floor(jdn - dn1);
    return wday;
  };

  _proto.lunarPhase = function lunarPhase(jd) {
    var Lmoon = this.moon(jd); // Logitudinal Moon

    var Lsun = this.sun(jd); // Logitudinal Sun

    return this.fix360(Lmoon - Lsun);
  };

  return MhahPanchangImpl;
}();

var MhahCalculateFunc = /*#__PURE__*/function () {
  function MhahCalculateFunc() {}

  var _proto = MhahCalculateFunc.prototype;

  _proto.calculate = function calculate(d, mhahConstant) {
    var mhahPanchangImpl = new MhahPanchangImpl(mhahConstant);
    var Day = {};
    var Tithi = {};
    var Paksha = {};
    var Nakshatra = {};
    var Karna = {};
    var Yoga = {};
    var Ayanamsa = {};
    var Raasi = {};
    var Julian = {};
    var Gana = {};
    var Guna = {};
    var Trinity = {};
    var n_wday,
        n_tithi = 1,
        n_naksh = 1,
        n_karana = 0,
        n_yoga; //var mhahPanchangImpl = new MhahPanchangImpl();

    var day = d.getDate();
    var mon = d.getMonth() + 1;
    var year = d.getFullYear();
    var hr = d.getHours();
    hr += d.getMinutes() / 60;
    var tzone = d.getTimezoneOffset() / 60 * -1;
    var inpmin = Math.floor(d.getMinutes());
    if (inpmin < 10) inpmin = '0' + inpmin; // Julian date in local p. LT:

    var dayhr = day + hr / 24;
    var jdlt = mhahPanchangImpl.mdy2julian(mon, dayhr, year); // Day:

    n_wday = mhahPanchangImpl.weekDay(jdlt);
    Day.ino = n_wday;
    Day.name = mhahConstant.Day.name[n_wday];
    Day.name_en_UK = mhahConstant.Day.name_en_UK[n_wday]; // julian day at the begining of the day

    var jd0 = mhahPanchangImpl.mdy2julian(mon, day, year);
    var jdut = jd0 + (hr - tzone) / 24;
    mhahPanchangImpl.dt = mhahPanchangImpl.dTime(jdut);
    var jd = jdut + mhahPanchangImpl.dt / 24; //ayyanamsa

    mhahPanchangImpl.ayanamsa = mhahPanchangImpl.calcayan(jd); // Logitudinal Moon

    mhahPanchangImpl.Lmoon = mhahPanchangImpl.moon(jd); // Logitudinal Sun

    mhahPanchangImpl.Lsun = mhahPanchangImpl.sun(jd); // yoga:

    var zyoga = this.getZYoga(mhahPanchangImpl, mhahPanchangImpl.ayanamsa, jd);
    n_yoga = this.getYoga(zyoga);
    var s_yoga = mhahPanchangImpl.yoga(jd, zyoga, tzone); // Nakstra

    n_naksh = this.getNakshatra(mhahPanchangImpl, mhahPanchangImpl.Lmoon, mhahPanchangImpl.ayanamsa);
    var s_naksh = mhahPanchangImpl.nakshatra(jd, n_naksh, tzone); // tithi

    n_tithi = this.getTithi(mhahPanchangImpl.Lmoon, mhahPanchangImpl.Lsun);
    var s_tithi = mhahPanchangImpl.tithi(jd, n_tithi, tzone, 12); // paksha

    var n_paksha = this.getPaksha(n_tithi + 1); // Karana

    var KaranaArray = this.getKarana(mhahPanchangImpl.Lmoon, mhahPanchangImpl.Lsun);
    n_karana = KaranaArray[0];
    var nk = KaranaArray[1];
    var s_karana = mhahPanchangImpl.tithi(jd, nk, tzone, 6);
    var z = this.getRaasi(mhahPanchangImpl, mhahPanchangImpl.Lmoon, mhahPanchangImpl.ayanamsa);
    Ayanamsa.name = mhahPanchangImpl.lon2dms(mhahPanchangImpl.ayanamsa);
    Raasi.name = mhahConstant.Raasi.name[z];
    Raasi.ino = z;
    Raasi.name_en_UK = mhahConstant.Raasi.name_en_UK[z];
    Guna.ino = this.getRaasiGuna(Raasi.ino);
    Guna.name_en_IN = mhahConstant.Guna.name_en_IN[Guna.ino];
    Guna.name_en_UK = mhahConstant.Guna.name_en_UK[Guna.ino];
    Guna.name = mhahConstant.Guna.name[Guna.ino];
    Nakshatra.name = mhahConstant.Nakshatra.name[n_naksh];
    Nakshatra.name_en_IN = mhahConstant.Nakshatra.name_en_IN[n_naksh];
    Nakshatra.ino = n_naksh;
    Nakshatra.start = s_naksh.start;
    Nakshatra.end = s_naksh.end;
    Trinity.ino = this.getTrinityByNakshatra(Nakshatra.ino);
    Trinity.name_en_IN = mhahConstant.Trinity.name_en_IN[Trinity.ino];
    Trinity.name = mhahConstant.Trinity.name[Trinity.ino];
    Gana.ino = this.getGanaViaNakshatra(Nakshatra.ino);
    Gana.name_en_IN = mhahConstant.Gana.name_en_IN[Gana.ino];
    Gana.name_en_UK = mhahConstant.Gana.name_en_UK[Gana.ino];
    Gana.name = mhahConstant.Gana.name[Gana.ino];
    Karna.name = mhahConstant.Karna.name[n_karana];
    Karna.name_en_IN = mhahConstant.Karna.name_en_IN[n_karana];
    Karna.ino = n_karana;
    Karna.start = s_karana.start;
    Karna.end = s_karana.end;
    Yoga.name = mhahConstant.Yoga.name[n_yoga];
    Yoga.name_en_IN = mhahConstant.Yoga.name_en_IN[n_yoga];
    Yoga.ino = n_yoga;
    Yoga.start = s_yoga.start;
    Yoga.end = s_yoga.end;
    Tithi.name = mhahConstant.Tithi.name[n_tithi];
    Tithi.name_en_IN = mhahConstant.Tithi.name_en_IN[n_tithi];
    Tithi.ino = n_tithi;
    Tithi.start = s_tithi.start;
    Tithi.end = s_tithi.end;
    Paksha.ino = n_paksha;
    Paksha.name = mhahConstant.Paksha.name[n_paksha];
    Paksha.name_en_IN = mhahConstant.Paksha.name_en_IN[n_paksha];
    Paksha.name_en_UK = mhahConstant.Paksha.name_en_UK[n_paksha];
    Julian.date = jd;
    Julian.day = Math.floor(jd);
    return {
      Day: Day,
      Tithi: Tithi,
      Paksha: Paksha,
      Nakshatra: Nakshatra,
      Karna: Karna,
      Yoga: Yoga,
      Ayanamsa: Ayanamsa,
      Raasi: Raasi,
      Julian: Julian,
      Gana: Gana,
      Guna: Guna,
      Trinity: Trinity
    };
  };

  _proto.getTithi = function getTithi(Lmoon, Lsun) {
    if (Lmoon < Lsun) Lmoon += 360;
    return Math.floor((Lmoon - Lsun) / 12);
  };

  _proto.getNakshatra = function getNakshatra(mhahPanchangImpl, Lmoon, ayanamsa) {
    var Lmoon0 = mhahPanchangImpl.fix360(Lmoon + ayanamsa);
    return Math.floor(Lmoon0 * 6 / 80);
  };

  _proto.getZYoga = function getZYoga(mhahPanchangImpl, ayanamsa, jd) {
    mhahPanchangImpl.moon(jd);
    mhahPanchangImpl.sun(jd);
    var dmoonYoga = mhahPanchangImpl.LmoonYoga + ayanamsa - 491143.07698973856;
    var dsunYoga = mhahPanchangImpl.LsunYoga + ayanamsa - 36976.91240579201;
    return dmoonYoga + dsunYoga;
  };

  _proto.getYoga = function getYoga(zyoga) {
    var n_yoga = zyoga * 6 / 80;

    while (n_yoga < 0) {
      n_yoga += 27;
    }

    while (n_yoga > 27) {
      n_yoga -= 27;
    }

    return Math.floor(n_yoga);
  };

  _proto.getKarana = function getKarana(Lmoon0, Lsun0) {
    var n_karana = 0,
        nk = 0;
    if (Lmoon0 < Lsun0) Lmoon0 += 360;
    nk = Math.floor((Lmoon0 - Lsun0) / 6);
    if (nk === 0) n_karana = 10;
    if (nk >= 57) n_karana = nk - 50;
    if (nk > 0 && nk < 57) n_karana = nk - 1 - Math.floor((nk - 1) / 7) * 7;
    return [n_karana, nk];
  };

  _proto.getRaasi = function getRaasi(mhahPanchangImpl, Lmoon, ayanamsa) {
    return Math.floor(Math.abs(mhahPanchangImpl.fix360(Lmoon + ayanamsa)) / 30);
  };

  _proto.getPaksha = function getPaksha(n_tithi) {
    return n_tithi > 15 ? 1 : 0;
  };

  _proto.getRaasiGuna = function getRaasiGuna(raasiIndex) {
    return raasiIndex % 3;
  };

  _proto.getTrinityByNakshatra = function getTrinityByNakshatra(raasiIndex) {
    return Math.floor(raasiIndex / 9);
  };

  _proto.getGanaViaNakshatra = function getGanaViaNakshatra(raasiIndex) {
    var ganaPostions = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0];
    return ganaPostions[raasiIndex];
  };

  return MhahCalculateFunc;
}();

var MhahLocalConstant = function MhahLocalConstant() {
  this.Ritu = {
    name: ['ବସନ୍ତ', 'ଗ୍ରୀଷ୍ମ', 'ବର୍ଷା', 'ଶରତ', 'ହେମନ୍ତ', 'ଶୀତ'],
    name_en_UK: ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Pre-Winter', 'Winter']
  };
  this.Masa = {
    name: ['ବୈଶାଖ', 'ଜ୍ୟେଷ୍ଠ', 'ଆଷାଢ', 'ଶ୍ରାବଣ', 'ଭାଦ୍ରବ', 'ଆଶ୍ଵିନ', 'କାର୍ତ୍ତିକ', 'ମାର୍ଗଶିର', 'ପୌଷ', 'ମାଘ', 'ଫାଲ୍ଗୁନ', 'ଚୈତ୍ର'],
    name_en_IN: ['Baisakha', 'Jyestha', 'Asadha', 'Srabana', 'Bhadraba', 'Aswina', 'Karttika', 'Margasira', 'Pausa', 'Magha', 'Phalguna', 'Chaitra']
  };
  this.Raasi = {
    name: ['ମେଷ', 'ବୃଷ', 'ମିଥୁନ', 'କର୍କଟ', 'ସିଂହ', 'କନ୍ୟା', 'ତୁଳା', 'ବିଛା', 'ଧନୁ', 'ମକର', 'କୁମ୍ଭ', 'ମୀନ'],
    name_en_UK: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  };
  this.Day = {
    name: ['ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧୁବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'],
    name_en_UK: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  this.Nakshatra = {
    name: ['ଅଶ୍ଵିନୀ', 'ଦ୍ଵିଜା', 'କୃତ୍ତିକା', 'ରୋହିଣୀ', 'ମୃଗଶିରା', 'ଆର୍ଦ୍ରା', 'ପୁନର୍ବସୁ', 'ପୁଷ୍ୟା', 'ଆଶ୍ଳେଷା', 'ମଘା', 'ପୂର୍ବଫାଲ୍ଗୁନୀ', 'ଉତ୍ତରାଫାଲ୍ଗୁନୀ', 'ହସ୍ତା', 'ଚିତ୍ରା', 'ସ୍ଵାତୀ', 'ବିଶାଖା', 'ଅନୁରାଧା', 'ଜ୍ୟେଷ୍ଠା', 'ମୂଳା', 'ପୂର୍ବଷାଢା', 'ଉତ୍ତରାଷାଢା', 'ଶ୍ରବଣା', 'ଧନିଷ୍ଠା', 'ସତଭିଷା', 'ପୂର୍ବଭାଦ୍ର', 'ଉତ୍ତରାଭାଦ୍ର', 'ରେବତୀ'],
    name_en_IN: ['Ashwini', 'Dwija', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Sravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Rebati']
  };
  this.Paksha = {
    name_en_IN: ['Shukla', 'Krishna'],
    name_en_UK: ['Waxing Moon', 'Waning Moon'],
    name: ['ଶୁକ୍ଲ', 'କୃଷ୍ଣ']
  };
  this.Tithi = {
    name: ['ପ୍ରତିପଦା', 'ଦ୍ଵିତୀୟା', 'ତୃତୀୟା', 'ଚତୁର୍ଥୀ', 'ପଞ୍ଚମୀ', 'ଷଷ୍ଠୀ', 'ସପ୍ତମୀ', 'ଅଷ୍ଟମୀ', 'ନବମୀ', 'ଦଶମୀ', 'ଏକାଦଶୀ', 'ଦ୍ଵାଦଶୀ', 'ତ୍ରୟୋଦଶୀ', 'ଚତୁର୍ଦ୍ଦଶୀ', 'ପୁର୍ଣିମା', 'ପ୍ରତିପଦା', 'ଦ୍ଵିତୀୟା', 'ତୃତୀୟା', 'ଚତୁର୍ଥୀ', 'ପଞ୍ଚମୀ', 'ଷଷ୍ଠୀ', 'ସପ୍ତମୀ', 'ଅଷ୍ଟମୀ', 'ନବମୀ', 'ଦଶମୀ', 'ଏକାଦଶୀ', 'ଦ୍ଵାଦଶୀ', 'ତ୍ରୟୋଦଶୀ', 'ଚତୁର୍ଦ୍ଦଶୀ', 'ଅମାବାସ୍ୟା'],
    name_en_IN: ['Padyami', 'Vidhiya', 'Thadiya', 'Chavithi', 'Panchami', 'Shasti', 'Sapthami', 'Ashtami', 'Navami', 'Dasami', 'Ekadasi', 'Dvadasi', 'Trayodasi', 'Chaturdasi', 'Punnami', 'Padyami', 'Vidhiya', 'Thadiya', 'Chaviti', 'Panchami', 'Shasti', 'Sapthami', 'Ashtami', 'Navami', 'Dasami', 'Ekadasi', 'Dvadasi', 'Trayodasi', 'Chaturdasi', 'Amavasya']
  };
  this.Karna = {
    name_en_IN: ['Bawa', 'Balava', 'Kaulava', 'Taitula', 'Garaja', 'Vanija', 'Vishti', 'Sakuna', 'Chatushpada', 'Nagava', 'Kimstughana'],
    name: ['ବବ', 'ବାଳବ', 'କୌଳବ', 'ତୈତିଳ', 'ଗର', 'ବାଣିଜ୍ୟ', 'ବିଷ୍ଟି', 'ଶକୁନି', 'ଚତୁଷ୍ପଦ', 'ନାଗ', 'କିଂସ୍ତୁଘ୍ନ']
  };
  this.Yoga = {
    name_en_IN: ['Vishkambha', 'Prithi', 'Ayushman', 'Saubhagya', 'Sobhana', 'Atiganda', 'Sukarman', 'Dhrithi', 'Soola', 'Ganda', 'Vridhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Siva', 'Siddha', 'Sadhya', 'Subha', 'Sukla', 'Bramha', 'Indra', 'Vaidhruthi'],
    name: ['ବିଷ୍ କୁମ୍ଭ', 'ପ୍ରୀତି', 'ଆୟୁଷ୍ମାନ', 'ସୌଭାଗ୍ୟ', 'ଶୋଭନ', 'ଅତିଗଣ୍ଡ', 'ସୁକର୍ମା', 'ଧୃତି', 'ଶୂଳ', 'ଗଣ୍ଡ', 'ବୃଦ୍ଧି', 'ଧ୍ରୁବ', 'ବ୍ୟାଘାତ', 'ହର୍ଷଣ', 'ବଜ୍ର', 'ଅସୃକ୍', 'ବ୍ୟତିପାତ', 'ବରୀୟାନ', 'ପରିଘ', 'ଶିବ', 'ସିଦ୍ଧ', 'ସାଧ୍ଧ', 'ଶୁଭ', 'ଶୁକ୍ଳ', 'ବ୍ରହ୍ମ', 'ଇନ୍ଦ୍ର', 'ବୈଧୃତି']
  };
  this.Trinity = {
    name_en_IN: ['Brahma', 'Vishnu', 'Shiva'],
    name: ['ବ୍ରହ୍ମା', 'ବିଷ୍ଣୁ', 'ଶିବ']
  };
  this.Guna = {
    name_en_IN: ['Rajas', 'Tamas', 'Satva'],
    name_en_UK: ['passion, activity, movement', 'ignorance, inertia, laziness', 'goodness, calmness, harmonious'],
    name: ['ରାଜସ୍', 'ତମାସ୍', 'ସତ୍ୟ']
  };
  this.Gana = {
    name_en_IN: ['Devata', 'Manushya', 'Rakshasa'],
    name_en_UK: ['God', 'Human', 'Demon'],
    name: ['ଦେବତା', 'ମନୁଷ୍ୟ', 'ରାକ୍ଷସ']
  };
};

var MhahPkgConstants = function MhahPkgConstants() {
  this.GanaMatched = [[6, 6, 0], [5, 6, 0], [1, 0, 6]];
};

var MhahSunMoonTimer = /*#__PURE__*/function () {
  function MhahSunMoonTimer() {
    this.rad = Math.PI / 180; // sun times configuration (angle, morning name, evening name)

    this.times = [[-0.833, 'sunRise', 'sunSet'], [-0.3, 'sunRiseEnd', 'sunSetStart'], [-6, 'dawn', 'dusk'], [-12, 'nauticalDawn', 'nauticalDusk'], [-18, 'nightEnd', 'night']];
    this.dayMs = 1000 * 60 * 60 * 24;
    this.J1970 = 2440588;
    this.J2000 = 2451545;
    this.J0 = 0.0009;
    this.e = this.rad * 23.4397; // obliquity of the Earth
  }

  var _proto = MhahSunMoonTimer.prototype;

  _proto.sunTimer = function sunTimer(date, lat, lng, height) {
    var calS = this.calculatSunTimer(date, lat, lng, height);
    var result = {
      solarNoon: this.fromJulian(calS.Jnoon),
      nadir: this.fromJulian(calS.Jnoon - 0.5)
    };
    var i, time, h0, Jset, Jrise;

    for (i = 0; i < this.times.length; i += 1) {
      time = this.times[i];
      h0 = (time[0] + calS.dh) * this.rad;
      Jset = this.getSetJ(h0, calS.lw, calS.phi, calS.dec, calS.n, calS.M, calS.L);
      Jrise = calS.Jnoon - (Jset - calS.Jnoon);
      result[time[1]] = this.fromJulian(Jrise);
      result[time[2]] = this.fromJulian(Jset);
    }

    return result;
  };

  _proto.calculatSunTimer = function calculatSunTimer(date, lat, lng, height) {
    height = height || 0;
    var lw = this.rad * -lng,
        phi = this.rad * lat,
        dh = this.observerAngle(height),
        d = this.toDays(date),
        n = this.julianCycle(d, lw),
        ds = this.approxTransit(0, lw, n),
        M = this.solarMeanAnomaly(ds),
        L = this.eclipticLongitude(M),
        dec = this.declination(L, 0),
        Jnoon = this.solarTransitJ(ds, M, L);
    return {
      Jnoon: Jnoon,
      dh: dh,
      lw: lw,
      phi: phi,
      dec: dec,
      n: n,
      M: M,
      L: L
    };
  };

  _proto.getSunRiseJd = function getSunRiseJd(date, lat, lng, height) {
    var calS = this.calculatSunTimer(date, lat, lng, height);
    var time, h0, Jset, Jrise;
    time = this.times[0];
    h0 = (time[0] + calS.dh) * this.rad;
    Jset = this.getSetJ(h0, calS.lw, calS.phi, calS.dec, calS.n, calS.M, calS.L);
    Jrise = calS.Jnoon - (Jset - calS.Jnoon);
    return Jrise;
  };

  _proto.observerAngle = function observerAngle(height) {
    return -2.076 * Math.sqrt(height) / 60;
  };

  _proto.julianCycle = function julianCycle(d, lw) {
    return Math.round(d - this.J0 - lw / (2 * Math.PI));
  };

  _proto.toJulian = function toJulian(date) {
    return date.valueOf() / this.dayMs - 0.5 + this.J1970;
  };

  _proto.fromJulian = function fromJulian(j) {
    return new Date((j + 0.5 - this.J1970) * this.dayMs);
  };

  _proto.toDays = function toDays(date) {
    return this.toJulian(date) - this.J2000;
  };

  _proto.approxTransit = function approxTransit(Ht, lw, n) {
    return this.J0 + (Ht + lw) / (2 * Math.PI) + n;
  };

  _proto.hourAngle = function hourAngle(h, phi, d) {
    return Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(d)) / (Math.cos(phi) * Math.cos(d)));
  };

  _proto.solarTransitJ = function solarTransitJ(ds, M, L) {
    return this.J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
  };

  _proto.solarMeanAnomaly = function solarMeanAnomaly(d) {
    return this.rad * (357.5291 + 0.98560028 * d);
  };

  _proto.eclipticLongitude = function eclipticLongitude(M) {
    var C = this.rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)),
        // equation of center
    P = this.rad * 102.9372; // perihelion of the Earth

    return M + C + P + Math.PI;
  };

  _proto.declination = function declination(l, b) {
    return Math.asin(Math.sin(b) * Math.cos(this.e) + Math.cos(b) * Math.sin(this.e) * Math.sin(l));
  };

  _proto.getSetJ = function getSetJ(h, lw, phi, dec, n, M, L) {
    var w = this.hourAngle(h, phi, dec),
        a = this.approxTransit(w, lw, n);
    return this.solarTransitJ(a, M, L);
  };

  return MhahSunMoonTimer;
}();

var MhahCalendar = /*#__PURE__*/function () {
  function MhahCalendar() {}

  var _proto = MhahCalendar.prototype;

  _proto.calendar = function calendar(mhahConstant, dt, lat, lng, height) {
    var Tithi = {};
    var Nakshatra = {};
    var Yoga = {};
    var Karna = {};
    var Masa = {};
    var MoonMasa = {};
    var Raasi = {};
    var Ritu = {};
    var Paksha = {};
    var Gana = {};
    var Guna = {};
    var Trinity = {};
    var mhahPanchangImpl = new MhahPanchangImpl(mhahConstant);
    var mhahCalculateFunc = new MhahCalculateFunc();
    var mhahSunMoonTimer = new MhahSunMoonTimer();
    var sunRise = mhahSunMoonTimer.getSunRiseJd(dt, lat, lng, height);
    var nn_tithi = this.getCalendarTithi(sunRise, mhahPanchangImpl);
    var nn_paksha = mhahCalculateFunc.getPaksha(nn_tithi);
    var ayanamsaAtRise = mhahPanchangImpl.calcayan(sunRise);
    var nn_naksh = this.getCalendarNakshatra(mhahCalculateFunc, mhahPanchangImpl, ayanamsaAtRise, sunRise);
    var nn_yoga = this.getCalendarYoga(mhahCalculateFunc, mhahPanchangImpl, sunRise, ayanamsaAtRise);
    var nn_karana = mhahCalculateFunc.getKarana(mhahPanchangImpl.moon(sunRise), mhahPanchangImpl.sun(sunRise))[0];
    var nn_raasi = this.getCalendarRaasi(mhahPanchangImpl, mhahPanchangImpl.sun(sunRise), ayanamsaAtRise);
    var masa = this.getMasa(mhahPanchangImpl, nn_tithi, sunRise);
    var ritu = this.getRitu(masa.n_maasa);
    Raasi.ino = nn_raasi - 1;
    Raasi.name_en_UK = mhahConstant.Raasi.name_en_UK[nn_raasi - 1];
    Raasi.name = mhahConstant.Raasi.name[nn_raasi - 1];
    Guna.ino = mhahCalculateFunc.getRaasiGuna(Raasi.ino);
    Guna.name_en_IN = mhahConstant.Guna.name_en_IN[Guna.ino];
    Guna.name_en_UK = mhahConstant.Guna.name_en_UK[Guna.ino];
    Guna.name = mhahConstant.Guna.name[Guna.ino];
    Tithi.name = mhahConstant.Tithi.name[nn_tithi - 1];
    Tithi.name_en_IN = mhahConstant.Tithi.name_en_IN[nn_tithi - 1];
    Tithi.ino = nn_tithi - 1;
    Paksha.ino = nn_paksha;
    Paksha.name = mhahConstant.Paksha.name[nn_paksha];
    Paksha.name_en_IN = mhahConstant.Paksha.name_en_IN[nn_paksha];
    Paksha.name_en_UK = mhahConstant.Paksha.name_en_UK[nn_paksha];
    Nakshatra.name = mhahConstant.Nakshatra.name[nn_naksh];
    Nakshatra.name_en_IN = mhahConstant.Nakshatra.name_en_IN[nn_naksh];
    Nakshatra.ino = nn_naksh;
    Trinity.ino = mhahCalculateFunc.getTrinityByNakshatra(Nakshatra.ino);
    Trinity.name_en_IN = mhahConstant.Trinity.name_en_IN[Trinity.ino];
    Trinity.name = mhahConstant.Trinity.name[Trinity.ino];
    Gana.ino = mhahCalculateFunc.getGanaViaNakshatra(Nakshatra.ino);
    Gana.name_en_IN = mhahConstant.Gana.name_en_IN[Gana.ino];
    Gana.name_en_UK = mhahConstant.Gana.name_en_UK[Gana.ino];
    Gana.name = mhahConstant.Gana.name[Gana.ino];
    Yoga.name = mhahConstant.Yoga.name[nn_yoga];
    Yoga.name_en_IN = mhahConstant.Yoga.name_en_IN[nn_yoga];
    Yoga.ino = nn_yoga;
    Karna.name = mhahConstant.Karna.name[nn_karana];
    Karna.name_en_IN = mhahConstant.Karna.name_en_IN[nn_karana];
    Karna.ino = nn_karana;
    Masa.ino = nn_raasi - 1;
    Masa.name = mhahConstant.Masa.name[nn_raasi - 1];
    Masa.name_en_IN = mhahConstant.Masa.name_en_IN[nn_raasi - 1];
    MoonMasa.ino = masa.n_maasa - 1;
    MoonMasa.isLeapMonth = masa.is_leap_month;
    MoonMasa.name = mhahConstant.Masa.name[masa.n_maasa - 1];
    MoonMasa.name_en_IN = mhahConstant.Masa.name_en_IN[masa.n_maasa - 1];
    Ritu.ino = ritu;
    Ritu.name = mhahConstant.Ritu.name[ritu];
    Ritu.name_en_UK = mhahConstant.Ritu.name_en_UK[ritu];
    return {
      Tithi: Tithi,
      Paksha: Paksha,
      Nakshatra: Nakshatra,
      Yoga: Yoga,
      Karna: Karna,
      Masa: Masa,
      MoonMasa: MoonMasa,
      Raasi: Raasi,
      Ritu: Ritu,
      Gana: Gana,
      Guna: Guna,
      Trinity: Trinity
    };
  } // get tithi in (1-15) Sukla and (16-30) Krushna
  ;

  _proto.getCalendarTithi = function getCalendarTithi(sunRise, mhahPanchangImpl) {
    var moonPhaseToday = mhahPanchangImpl.lunarPhase(sunRise);
    var today = Math.ceil(moonPhaseToday / 12);
    var tithi = today; //check for skipped tithi

    var moonPhaseTommorow = mhahPanchangImpl.lunarPhase(sunRise + 1);
    var tommorow = Math.ceil(moonPhaseTommorow / 12);
    var isSkipped = (tommorow - today) % 30 > 1;

    if (isSkipped) {
      tithi = today + 1;
    }

    return tithi;
  };

  _proto.getCalendarNakshatra = function getCalendarNakshatra(mhahCalculateFunc, mhahPanchangImpl, ayanamsa, sunRise) {
    var nak_today = mhahCalculateFunc.getNakshatra(mhahPanchangImpl, mhahPanchangImpl.moon(sunRise), ayanamsa);
    var nak_tmrw = mhahCalculateFunc.getNakshatra(mhahPanchangImpl, mhahPanchangImpl.moon(sunRise + 1), mhahPanchangImpl.calcayan(sunRise + 1));
    var n_nak = nak_today;
    var isSkipped = (nak_tmrw - nak_today) % 27 > 1;

    if (isSkipped) {
      n_nak = nak_today + 1;
    }

    return n_nak;
  };

  _proto.getCalendarYoga = function getCalendarYoga(mhahCalculateFunc, mhahPanchangImpl, sunRise, ayanamsa) {
    var todayYoga = mhahCalculateFunc.getYoga(mhahCalculateFunc.getZYoga(mhahPanchangImpl, ayanamsa, sunRise));
    var tmorowYoga = mhahCalculateFunc.getYoga(mhahCalculateFunc.getZYoga(mhahPanchangImpl, mhahPanchangImpl.calcayan(sunRise + 1), sunRise + 1));
    var n_yoga = todayYoga;
    var isSkipped = (tmorowYoga - todayYoga) % 27 > 1;

    if (isSkipped) {
      n_yoga = todayYoga + 1;
    }

    return n_yoga;
  };

  _proto.getCalendarRaasi = function getCalendarRaasi(mhahPanchangImpl, Lsun, ayanamsa) {
    var solar_nirayana = mhahPanchangImpl.fix360(Lsun + ayanamsa);
    return Math.ceil(solar_nirayana / 30);
  };

  _proto.getMasa = function getMasa(mhahPanchangImpl, tithi, sunrise) {
    var lastNewMoon = sunrise - (tithi - 1);
    var nextNewMoon = sunrise + (29 - (tithi - 1));
    var currentSolarMonth = this.getCalendarRaasi(mhahPanchangImpl, mhahPanchangImpl.sun(lastNewMoon), mhahPanchangImpl.calcayan(lastNewMoon));
    var nextSolarMonth = this.getCalendarRaasi(mhahPanchangImpl, mhahPanchangImpl.sun(nextNewMoon), mhahPanchangImpl.calcayan(nextNewMoon));
    var is_leap_month = currentSolarMonth === nextSolarMonth;
    var n_maasa = is_leap_month ? currentSolarMonth : currentSolarMonth + 1;

    if (n_maasa > 12) {
      n_maasa = n_maasa % 12;
    }

    return {
      n_maasa: n_maasa,
      is_leap_month: is_leap_month
    };
  };

  _proto.getRitu = function getRitu(masa_num) {
    return Math.floor((masa_num - 1) / 2);
  };

  return MhahCalendar;
}();

var MhahPanchang = /*#__PURE__*/function () {
  function MhahPanchang() {
    this.mhahLocalConstant = new MhahLocalConstant();
    this.mhahPkgConstants = new MhahPkgConstants();
    this.mhahCalculateFunc = new MhahCalculateFunc();
    this.mhahSunMoonTimer = new MhahSunMoonTimer();
    this.mhahCalendar = new MhahCalendar();
  }

  var _proto = MhahPanchang.prototype;

  _proto.calculate = function calculate(dt) {
    return this.mhahCalculateFunc.calculate(dt, this.mhahLocalConstant);
  };

  _proto.calendar = function calendar(dt, lat, lng, height) {
    return this.mhahCalendar.calendar(this.mhahLocalConstant, dt, lat, lng, height);
  };

  _proto.sunTimer = function sunTimer(date, lat, lng, height) {
    height = height || 0;
    return this.mhahSunMoonTimer.sunTimer(date, lat, lng, height);
  };

  _proto.getMhahConstant = function getMhahConstant(catgory, name) {
    return this.mhahLocalConstant[catgory][name];
  };

  _proto.setMhahConstant = function setMhahConstant(catgory, name, mhahlist) {
    this.mhahLocalConstant[catgory][name] = mhahlist;
  };

  _proto.getGanaMatched = function getGanaMatched(brideIno, groomIno) {
    return this.mhahPkgConstants.GanaMatched[brideIno][groomIno];
  };

  return MhahPanchang;
}();

export { MhahPanchang };

