var t =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
      ? self
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : {},
  r = {},
  e = function (t) {
    return t && t.Math == Math && t;
  };
r =
  e('object' == typeof globalThis && globalThis) ||
  e('object' == typeof window && window) ||
  e('object' == typeof self && self) ||
  e('object' == typeof t && t) ||
  (function () {
    return this;
  })() ||
  Function('return this')();
var n,
  o,
  i = {};
n = !(o = function (t) {
  try {
    return !!t();
  } catch (t) {
    return !0;
  }
})(function () {
  var t = function () {}.bind();
  return 'function' != typeof t || t.hasOwnProperty('prototype');
});
var a = Function.prototype.call;
i = n
  ? a.bind(a)
  : function () {
      return a.apply(a, arguments);
    };
var u, c;
c = 'undefined' != typeof ArrayBuffer && 'undefined' != typeof DataView;
var s;
s = !o(function () {
  return (
    7 !=
    Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      },
    })[1]
  );
});
var f;
f = function (t) {
  return 'function' == typeof t;
};
var p;
p = function (t) {
  return 'object' == typeof t ? null !== t : f(t);
};
var y = {},
  l = {},
  d = Function.prototype,
  v = d.bind,
  g = d.call,
  b = n && v.bind(g, g);
l = n
  ? function (t) {
      return t && b(t);
    }
  : function (t) {
      return (
        t &&
        function () {
          return g.apply(t, arguments);
        }
      );
    };
var h,
  m,
  w = TypeError;
m = function (t) {
  if (null == t) throw w("Can't call method on " + t);
  return t;
};
var S = Object;
h = function (t) {
  return S(m(t));
};
var A = l({}.hasOwnProperty);
y =
  Object.hasOwn ||
  function (t, r) {
    return A(h(t), r);
  };
var O,
  T,
  _,
  j = {};
var E,
  P = {},
  C = Object.defineProperty;
E = function (t, e) {
  try {
    C(r, t, { value: e, configurable: !0, writable: !0 });
  } catch (n) {
    r[t] = e;
  }
  return e;
};
var F = r['__core-js_shared__'] || E('__core-js_shared__', {});
(P = F),
  (_ = function (t, r) {
    return P[t] || (P[t] = void 0 !== r ? r : {});
  })('versions', []).push({
    version: '3.24.1',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
    source: 'https://github.com/zloirock/core-js',
  });
var I,
  M = 0,
  D = Math.random(),
  R = l((1).toString);
I = function (t) {
  return 'Symbol(' + (void 0 === t ? '' : t) + ')_' + R(++M + D, 36);
};
var U,
  k,
  x,
  q = {},
  L = function (t) {
    return f(t) ? t : void 0;
  };
q =
  (x = function (t, e) {
    return arguments.length < 2 ? L(r[t]) : r[t] && r[t][e];
  })('navigator', 'userAgent') || '';
var B,
  W,
  z = r.process,
  V = r.Deno,
  N = (z && z.versions) || (V && V.version),
  G = N && N.v8;
G && (W = (B = G.split('.'))[0] > 0 && B[0] < 4 ? 1 : +(B[0] + B[1])),
  !W &&
    q &&
    (!(B = q.match(/Edge\/(\d+)/)) || B[1] >= 74) &&
    (B = q.match(/Chrome\/(\d+)/)) &&
    (W = +B[1]),
  (k = W),
  (U =
    !!Object.getOwnPropertySymbols &&
    !o(function () {
      var t = Symbol();
      return (
        !String(t) ||
        !(Object(t) instanceof Symbol) ||
        (!Symbol.sham && k && k < 41)
      );
    }));
var Y;
Y = U && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
var $ = _('wks'),
  J = r.Symbol,
  Z = J && J.for,
  H = Y ? J : (J && J.withoutSetter) || I,
  K = {};
(K[
  (T = function (t) {
    if (!y($, t) || (!U && 'string' != typeof $[t])) {
      var r = 'Symbol.' + t;
      U && y(J, t) ? ($[t] = J[t]) : ($[t] = Y && Z ? Z(r) : H(r));
    }
    return $[t];
  })('toStringTag')
] = 'z'),
  (O = '[object z]' === String(K));
var X,
  Q = l({}.toString),
  tt = l(''.slice);
X = function (t) {
  return tt(Q(t), 8, -1);
};
var rt = T('toStringTag'),
  et = Object,
  nt =
    'Arguments' ==
    X(
      (function () {
        return arguments;
      })()
    );
j = O
  ? X
  : function (t) {
      var r, e, n;
      return void 0 === t
        ? 'Undefined'
        : null === t
        ? 'Null'
        : 'string' ==
          typeof (e = (function (t, r) {
            try {
              return t[r];
            } catch (t) {}
          })((r = et(t)), rt))
        ? e
        : nt
        ? X(r)
        : 'Object' == (n = X(r)) && f(r.callee)
        ? 'Arguments'
        : n;
    };
var ot,
  it = String;
ot = function (t) {
  try {
    return it(t);
  } catch (t) {
    return 'Object';
  }
};
var at,
  ut,
  ct,
  st = {},
  ft = r.document,
  pt = p(ft) && p(ft.createElement);
(ct = function (t) {
  return pt ? ft.createElement(t) : {};
}),
  (ut =
    !s &&
    !o(function () {
      return (
        7 !=
        Object.defineProperty(ct('div'), 'a', {
          get: function () {
            return 7;
          },
        }).a
      );
    }));
var yt;
yt =
  s &&
  o(function () {
    return (
      42 !=
      Object.defineProperty(function () {}, 'prototype', {
        value: 42,
        writable: !1,
      }).prototype
    );
  });
var lt,
  dt = String,
  vt = TypeError;
lt = function (t) {
  if (p(t)) return t;
  throw vt(dt(t) + ' is not an object');
};
var gt,
  bt,
  ht = {},
  mt = {};
mt = l({}.isPrototypeOf);
var wt = Object;
ht = Y
  ? function (t) {
      return 'symbol' == typeof t;
    }
  : function (t) {
      var r = x('Symbol');
      return f(r) && mt(r.prototype, wt(t));
    };
var St,
  At,
  Ot = TypeError;
(At = function (t) {
  if (f(t)) return t;
  throw Ot(ot(t) + ' is not a function');
}),
  (St = function (t, r) {
    var e = t[r];
    return null == e ? void 0 : At(e);
  });
var Tt,
  _t = TypeError;
Tt = function (t, r) {
  var e, n;
  if ('string' === r && f((e = t.toString)) && !p((n = i(e, t)))) return n;
  if (f((e = t.valueOf)) && !p((n = i(e, t)))) return n;
  if ('string' !== r && f((e = t.toString)) && !p((n = i(e, t)))) return n;
  throw _t("Can't convert object to primitive value");
};
var jt = TypeError,
  Et = T('toPrimitive');
(bt = function (t, r) {
  if (!p(t) || ht(t)) return t;
  var e,
    n = St(t, Et);
  if (n) {
    if ((void 0 === r && (r = 'default'), (e = i(n, t, r)), !p(e) || ht(e)))
      return e;
    throw jt("Can't convert object to primitive value");
  }
  return void 0 === r && (r = 'number'), Tt(t, r);
}),
  (gt = function (t) {
    var r = bt(t, 'string');
    return ht(r) ? r : r + '';
  });
var Pt = TypeError,
  Ct = Object.defineProperty,
  Ft = Object.getOwnPropertyDescriptor;
at = s
  ? yt
    ? function (t, r, e) {
        if (
          (lt(t),
          (r = gt(r)),
          lt(e),
          'function' == typeof t &&
            'prototype' === r &&
            'value' in e &&
            'writable' in e &&
            !e.writable)
        ) {
          var n = Ft(t, r);
          n &&
            n.writable &&
            ((t[r] = e.value),
            (e = {
              configurable:
                'configurable' in e ? e.configurable : n.configurable,
              enumerable: 'enumerable' in e ? e.enumerable : n.enumerable,
              writable: !1,
            }));
        }
        return Ct(t, r, e);
      }
    : Ct
  : function (t, r, e) {
      if ((lt(t), (r = gt(r)), lt(e), ut))
        try {
          return Ct(t, r, e);
        } catch (t) {}
      if ('get' in e || 'set' in e) throw Pt('Accessors not supported');
      return 'value' in e && (t[r] = e.value), t;
    };
var It;
(It = function (t, r) {
  return {
    enumerable: !(1 & t),
    configurable: !(2 & t),
    writable: !(4 & t),
    value: r,
  };
}),
  (st = s
    ? function (t, r, e) {
        return at(t, r, It(1, e));
      }
    : function (t, r, e) {
        return (t[r] = e), t;
      });
var Mt,
  Dt,
  Rt = Function.prototype,
  Ut = s && Object.getOwnPropertyDescriptor,
  kt = y(Rt, 'name'),
  xt = {
    EXISTS: kt,
    PROPER: kt && 'something' === function () {}.name,
    CONFIGURABLE: kt && (!s || (s && Ut(Rt, 'name').configurable)),
  }.CONFIGURABLE,
  qt = {},
  Lt = l(Function.toString);
f(P.inspectSource) ||
  (P.inspectSource = function (t) {
    return Lt(t);
  }),
  (qt = P.inspectSource);
var Bt,
  Wt,
  zt = r.WeakMap;
Wt = f(zt) && /native code/.test(qt(zt));
var Vt,
  Nt = _('keys');
Vt = function (t) {
  return Nt[t] || (Nt[t] = I(t));
};
var Gt = {};
Gt = {};
var Yt,
  $t,
  Jt,
  Zt = r.TypeError,
  Ht = r.WeakMap;
if (Wt || P.state) {
  var Kt = P.state || (P.state = new Ht()),
    Xt = l(Kt.get),
    Qt = l(Kt.has),
    tr = l(Kt.set);
  (Yt = function (t, r) {
    if (Qt(Kt, t)) throw new Zt('Object already initialized');
    return (r.facade = t), tr(Kt, t, r), r;
  }),
    ($t = function (t) {
      return Xt(Kt, t) || {};
    }),
    (Jt = function (t) {
      return Qt(Kt, t);
    });
} else {
  var rr = Vt('state');
  (Gt[rr] = !0),
    (Yt = function (t, r) {
      if (y(t, rr)) throw new Zt('Object already initialized');
      return (r.facade = t), st(t, rr, r), r;
    }),
    ($t = function (t) {
      return y(t, rr) ? t[rr] : {};
    }),
    (Jt = function (t) {
      return y(t, rr);
    });
}
var er = (Bt = {
    set: Yt,
    get: $t,
    has: Jt,
    enforce: function (t) {
      return Jt(t) ? $t(t) : Yt(t, {});
    },
    getterFor: function (t) {
      return function (r) {
        var e;
        if (!p(r) || (e = $t(r)).type !== t)
          throw Zt('Incompatible receiver, ' + t + ' required');
        return e;
      };
    },
  }).enforce,
  nr = Bt.get,
  or = Object.defineProperty,
  ir =
    s &&
    !o(function () {
      return 8 !== or(function () {}, 'length', { value: 8 }).length;
    }),
  ar = String(String).split('String'),
  ur = (Dt = function (t, r, e) {
    'Symbol(' === String(r).slice(0, 7) &&
      (r = '[' + String(r).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
      e && e.getter && (r = 'get ' + r),
      e && e.setter && (r = 'set ' + r),
      (!y(t, 'name') || (xt && t.name !== r)) &&
        (s ? or(t, 'name', { value: r, configurable: !0 }) : (t.name = r)),
      ir &&
        e &&
        y(e, 'arity') &&
        t.length !== e.arity &&
        or(t, 'length', { value: e.arity });
    try {
      e && y(e, 'constructor') && e.constructor
        ? s && or(t, 'prototype', { writable: !1 })
        : t.prototype && (t.prototype = void 0);
    } catch (t) {}
    var n = er(t);
    return (
      y(n, 'source') || (n.source = ar.join('string' == typeof r ? r : '')), t
    );
  });
(Function.prototype.toString = ur(function () {
  return (f(this) && nr(this).source) || qt(this);
}, 'toString')),
  (Mt = function (t, r, e, n) {
    n || (n = {});
    var o = n.enumerable,
      i = void 0 !== n.name ? n.name : r;
    if ((f(e) && Dt(e, i, n), n.global)) o ? (t[r] = e) : E(r, e);
    else {
      try {
        n.unsafe ? t[r] && (o = !0) : delete t[r];
      } catch (t) {}
      o
        ? (t[r] = e)
        : at(t, r, {
            value: e,
            enumerable: !1,
            configurable: !n.nonConfigurable,
            writable: !n.nonWritable,
          });
    }
    return t;
  });
var cr,
  sr = at,
  fr = {};
cr = !o(function () {
  function t() {}
  return (
    (t.prototype.constructor = null),
    Object.getPrototypeOf(new t()) !== t.prototype
  );
});
var pr = Vt('IE_PROTO'),
  yr = Object,
  lr = yr.prototype;
fr = cr
  ? yr.getPrototypeOf
  : function (t) {
      var r = h(t);
      if (y(r, pr)) return r[pr];
      var e = r.constructor;
      return f(e) && r instanceof e ? e.prototype : r instanceof yr ? lr : null;
    };
var dr,
  vr = {},
  gr = String,
  br = TypeError;
(dr = function (t) {
  if ('object' == typeof t || f(t)) return t;
  throw br("Can't set " + gr(t) + ' as a prototype');
}),
  (vr =
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function () {
          var t,
            r = !1,
            e = {};
          try {
            (t = l(
              Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set
            ))(e, []),
              (r = e instanceof Array);
          } catch (t) {}
          return function (e, n) {
            return lt(e), dr(n), r ? t(e, n) : (e.__proto__ = n), e;
          };
        })()
      : void 0));
var hr,
  mr,
  wr,
  Sr = Bt.enforce,
  Ar = Bt.get,
  Or = r.Int8Array,
  Tr = Or && Or.prototype,
  _r = r.Uint8ClampedArray,
  jr = _r && _r.prototype,
  Er = Or && fr(Or),
  Pr = Tr && fr(Tr),
  Cr = Object.prototype,
  Fr = r.TypeError,
  Ir = T('toStringTag'),
  Mr = I('TYPED_ARRAY_TAG'),
  Dr = c && !!vr && 'Opera' !== j(r.opera),
  Rr = !1,
  Ur = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8,
  },
  kr = { BigInt64Array: 8, BigUint64Array: 8 },
  xr = function (t) {
    var r = fr(t);
    if (p(r)) {
      var e = Ar(r);
      return e && y(e, 'TypedArrayConstructor')
        ? e.TypedArrayConstructor
        : xr(r);
    }
  },
  qr = function (t) {
    if (!p(t)) return !1;
    var r = j(t);
    return y(Ur, r) || y(kr, r);
  };
for (hr in Ur)
  (wr = (mr = r[hr]) && mr.prototype)
    ? (Sr(wr).TypedArrayConstructor = mr)
    : (Dr = !1);
for (hr in kr)
  (wr = (mr = r[hr]) && mr.prototype) && (Sr(wr).TypedArrayConstructor = mr);
if (
  (!Dr || !f(Er) || Er === Function.prototype) &&
  ((Er = function () {
    throw Fr('Incorrect invocation');
  }),
  Dr)
)
  for (hr in Ur) r[hr] && vr(r[hr], Er);
if ((!Dr || !Pr || Pr === Cr) && ((Pr = Er.prototype), Dr))
  for (hr in Ur) r[hr] && vr(r[hr].prototype, Pr);
if ((Dr && fr(jr) !== Pr && vr(jr, Pr), s && !y(Pr, Ir)))
  for (hr in ((Rr = !0),
  sr(Pr, Ir, {
    get: function () {
      return p(this) ? this[Mr] : void 0;
    },
  }),
  Ur))
    r[hr] && st(r[hr], Mr, hr);
u = {
  NATIVE_ARRAY_BUFFER_VIEWS: Dr,
  TYPED_ARRAY_TAG: Rr && Mr,
  aTypedArray: function (t) {
    if (qr(t)) return t;
    throw Fr('Target is not a typed array');
  },
  aTypedArrayConstructor: function (t) {
    if (f(t) && (!vr || mt(Er, t))) return t;
    throw Fr(ot(t) + ' is not a typed array constructor');
  },
  exportTypedArrayMethod: function (t, e, n, o) {
    if (s) {
      if (n)
        for (var i in Ur) {
          var a = r[i];
          if (a && y(a.prototype, t))
            try {
              delete a.prototype[t];
            } catch (r) {
              try {
                a.prototype[t] = e;
              } catch (t) {}
            }
        }
      (Pr[t] && !n) || Mt(Pr, t, n ? e : (Dr && Tr[t]) || e, o);
    }
  },
  exportTypedArrayStaticMethod: function (t, e, n) {
    var o, i;
    if (s) {
      if (vr) {
        if (n)
          for (o in Ur)
            if ((i = r[o]) && y(i, t))
              try {
                delete i[t];
              } catch (t) {}
        if (Er[t] && !n) return;
        try {
          return Mt(Er, t, n ? e : (Dr && Er[t]) || e);
        } catch (t) {}
      }
      for (o in Ur) !(i = r[o]) || (i[t] && !n) || Mt(i, t, e);
    }
  },
  getTypedArrayConstructor: xr,
  isView: function (t) {
    if (!p(t)) return !1;
    var r = j(t);
    return 'DataView' === r || y(Ur, r) || y(kr, r);
  },
  isTypedArray: qr,
  TypedArray: Er,
  TypedArrayPrototype: Pr,
};
var Lr,
  Br,
  Wr,
  zr = {},
  Vr = Math.ceil,
  Nr = Math.floor;
(zr =
  Math.trunc ||
  function (t) {
    var r = +t;
    return (r > 0 ? Nr : Vr)(r);
  }),
  (Wr = function (t) {
    var r = +t;
    return r != r || 0 === r ? 0 : zr(r);
  });
var Gr = Math.min;
(Br = function (t) {
  return t > 0 ? Gr(Wr(t), 9007199254740991) : 0;
}),
  (Lr = function (t) {
    return Br(t.length);
  });
var Yr,
  $r,
  Jr = RangeError;
$r = function (t) {
  var r = Wr(t);
  if (r < 0) throw Jr("The argument can't be less than 0");
  return r;
};
var Zr = RangeError;
Yr = function (t, r) {
  var e = $r(t);
  if (e % r) throw Zr('Wrong offset');
  return e;
};
var Hr = r.RangeError,
  Kr = r.Int8Array,
  Xr = Kr && Kr.prototype,
  Qr = Xr && Xr.set,
  te = u.aTypedArray,
  re = u.exportTypedArrayMethod,
  ee = !o(function () {
    var t = new Uint8ClampedArray(2);
    return i(Qr, t, { length: 1, 0: 3 }, 1), 3 !== t[1];
  }),
  ne =
    ee &&
    u.NATIVE_ARRAY_BUFFER_VIEWS &&
    o(function () {
      var t = new Kr(2);
      return t.set(1), t.set('2', 1), 0 !== t[0] || 2 !== t[1];
    });
re(
  'set',
  function (t) {
    te(this);
    var r = Yr(arguments.length > 1 ? arguments[1] : void 0, 1),
      e = h(t);
    if (ee) return i(Qr, this, e, r);
    var n = this.length,
      o = Lr(e),
      a = 0;
    if (o + r > n) throw Hr('Wrong length');
    for (; a < o; ) this[r + a] = e[a++];
  },
  !ee || ne
);
const oe = function () {
    const t = document.querySelector('.alert');
    t && t.remove();
  },
  ie = function (t, r, e = 5) {
    oe();
    const n = `<div class="alert alert--${t}">${r}</div>`;
    document.body.insertAdjacentHTML('afterbegin', n), setTimeout(oe, 1e3 * e);
  },
  ae = async (t, r) => {
    try {
      const e = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: { email: t, password: r },
      });
      'success' === e.data.status &&
        (ie(e.data.status, 'You are login'),
        setTimeout(() => {
          window.location.assign('/');
        }, 1500));
    } catch (t) {
      console.error(t), ie('error', t.response.data.message);
    }
  };
async function ue(t, r) {
  try {
    const e = 'password' === r ? 'updateMyPassword' : 'updateMe';
    await axios({ url: `/api/v1/users/${e}`, method: 'PATCH', data: t });
    ie('success', 'password' === r ? 'Password updated' : 'Data updated');
  } catch (t) {
    console.error(t), ie('error', t.response.data.message);
  }
}
Stripe(
  'pk_test_51LWN6VFI2ilgj0fiMOeStkzpJMGxdWbJKMBF9OZEC7JgCAbtP0yZ6dTWZO2tvyoEbz0hTAsUxOw8xtaGMuIoDUVL00eEhNfbED'
);
var ce = async (t) => {
  try {
    const r = await axios(`/api/v1/booking/create-season/${t}`),
      { sessions: e } = r.data;
    window.location.assign(`${e.url}`);
  } catch (t) {
    ie('error', 'Payment failed'), console.error(t);
  }
};
const se = document.querySelector('.form-login'),
  fe = document.querySelector('.nav__el--logout'),
  pe = document.querySelector('.form-user-data'),
  ye = document.querySelector('.form-user-settings'),
  le = document.getElementById('btn-payment');
se?.addEventListener('submit', function (t) {
  t.preventDefault();
  const { email: r, password: e } = Object.fromEntries(
    new FormData(this).entries()
  );
  ae(r, e);
}),
  fe?.addEventListener('click', async function () {
    try {
      await axios({ url: '/api/v1/users/logout', method: 'GET' });
      window.location.reload();
    } catch (t) {
      showPopUp('error', t.message), console.error(t);
    }
  }),
  pe?.addEventListener('submit', function (t) {
    t.preventDefault();
    const r = new FormData(this);
    console.log(r), ue(r, 'user');
  }),
  ye?.addEventListener('submit', async function (t) {
    t.preventDefault(),
      (document.querySelector('.btn--save-password').textContent =
        'Updating....');
    const r = Object.fromEntries(new FormData(this).entries());
    await ue(r, 'password'),
      (document.querySelector('.btn--save-password').textContent =
        'Save password'),
      (document.querySelector('.form__input--password').value = ''),
      (document.querySelector('.form__input--newPassword').value = ''),
      (document.querySelector('.form__input--newPasswordConfirm').value = '');
  }),
  le?.addEventListener('click', async function () {
    (this.textContent = 'Processing...'),
      await ce(this.dataset.tourId),
      (this.textContent = 'Book tour now!');
  });
const de = document.querySelector('body').dataset.alert;
de && ie('success', de, 15);
//# sourceMappingURL=index.js.map
