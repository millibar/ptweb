console.log('big6.js is loaded.');

const pushup = {
  1: {
    title: 'ウォール・プッシュアップ',
    level1: '10レップスを1セット',
    level2: '25レップスを2セット',
    level3: '50レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 25, SET: 2 },
      level3: { REPS: 50, SET: 3 }
    }
  },
  2: {
    title: 'インクライン・プッシュアップ',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '40レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 40, SET: 3 }
    }
  },
  3: {
    title: 'ニーリング・プッシュアップ',
    level1: '10レップスを1セット',
    level2: '15レップスを2セット',
    level3: '30レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 30, SET: 3 }
    }
  },
  4: {
    title: 'ハーフ・プッシュアップ',
    level1: '8レップスを1セット',
    level2: '12レップスを2セット',
    level3: '25レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 12, SET: 2 },
      level3: { REPS: 25, SET: 2 }
    }
  },
  5: {
    title: 'フル・プッシュアップ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  6: {
    title: 'クローズ・プッシュアップ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  7: {
    title: 'アンイーブン・プッシュアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '10レップスを2セット（片腕ずつ）',
    level3: '20レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  8: {
    title: 'ハーフ・ワンアーム・プッシュアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '10レップスを2セット（片腕ずつ）',
    level3: '20レップスを3セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 3 }
    }
  },
  9: {
    title: 'レバー・プッシュアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '10レップスを2セット（片腕ずつ）',
    level3: '20レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  10: {
    title: 'ワンアーム・プッシュアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '10レップスを2セット（片腕ずつ）',
    level3: '100レップスを1セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 100, SET: 1 }
    }
  }
}

const squat = {
  1: {
    title: 'ショルダースタンド・スクワット',
    level1: '10レップスを1セット',
    level2: '25レップスを2セット',
    level3: '50レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 25, SET: 2 },
      level3: { REPS: 50, SET: 3 }
    }
  },
  2: {
    title: 'ジャックナイフ・スクワット',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '40レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 40, SET: 3 }
    }
  },
  3: {
    title: 'サポーテッド・スクワット',
    level1: '10レップスを1セット',
    level2: '15レップスを2セット',
    level3: '30レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 30, SET: 3 }
    }
  },
  4: {
    title: 'ハーフ・スクワット',
    level1: '8レップスを1セット',
    level2: '35レップスを2セット',
    level3: '50レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 35, SET: 2 },
      level3: { REPS: 50, SET: 2 }
    }
  },
  5: {
    title: 'フル・スクワット',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '30レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 30, SET: 2 }
    }
  },
  6: {
    title: 'クローズ・スクワット',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  7: {
    title: 'アンイーブン・スクワット',
    level1: '5レップスを1セット（片脚ずつ）',
    level2: '10レップスを2セット（片脚ずつ）',
    level3: '20レップスを2セット（片脚ずつ）',
    alt: true,
    placeholder: '右脚',
    placeholderAlt: '左脚',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  8: {
    title: 'ハーフ・ワンレッグ・スクワット',
    level1: '5レップスを1セット（片脚ずつ）',
    level2: '10レップスを2セット（片脚ずつ）',
    level3: '20レップスを3セット（片脚ずつ）',
    alt: true,
    placeholder: '右脚',
    placeholderAlt: '左脚',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  9: {
    title: 'アシステッド・ワンレッグ・スクワット',
    level1: '5レップスを1セット（片脚ずつ）',
    level2: '10レップスを2セット（片脚ずつ）',
    level3: '20レップスを2セット（片脚ずつ）',
    alt: true,
    placeholder: '右脚',
    placeholderAlt: '左脚',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  10: {
    title: 'ワンレッグ・スクワット',
    level1: '5レップスを1セット（片脚ずつ）',
    level2: '10レップスを2セット（片脚ずつ）',
    level3: '50レップスを2セット（片脚ずつ）',
    alt: true,
    placeholder: '右脚',
    placeholderAlt: '左脚',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 50, SET: 2 }
    }
  }
}

const pullup = {
  1: {
    title: 'ヴァーチカル・プル',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '40レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 40, SET: 3 }
    }
  },
  2: {
    title: 'ホリゾンタル・プル',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '30レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 30, SET: 3 }
    }
  },
  3: {
    title: 'ジャックナイフ・プル',
    level1: '10レップスを1セット',
    level2: '15レップスを2セット',
    level3: '20レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 20, SET: 3 }
    }
  },
  4: {
    title: 'ハーフ・プルアップ',
    level1: '8レップスを1セット',
    level2: '11レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 11, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  5: {
    title: 'フル・プルアップ',
    level1: '5レップスを1セット',
    level2: '8レップスを2セット',
    level3: '10レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 8, SET: 2 },
      level3: { REPS: 10, SET: 2 }
    }
  },
  6: {
    title: 'クローズ・プルアップ',
    level1: '5レップスを1セット',
    level2: '8レップスを2セット',
    level3: '10レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 8, SET: 2 },
      level3: { REPS: 10, SET: 2 }
    }
  },
  7: {
    title: 'アンイーブン・プルアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '7レップスを2セット（片腕ずつ）',
    level3: '9レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 7, SET: 2 },
      level3: { REPS: 9, SET: 2 }
    }
  },
  8: {
    title: 'ハーフ・ワンアーム・プルアップ',
    level1: '4レップスを1セット（片腕ずつ）',
    level2: '6レップスを2セット（片腕ずつ）',
    level3: '8レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 4, SET: 1 },
      level2: { REPS: 6, SET: 2 },
      level3: { REPS: 8, SET: 2 }
    }
  },
  9: {
    title: 'アシステッド・ワンアーム・プルアップ',
    level1: '3レップスを1セット（片腕ずつ）',
    level2: '5レップスを2セット（片腕ずつ）',
    level3: '7レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 3, SET: 1 },
      level2: { REPS: 5, SET: 2 },
      level3: { REPS: 7, SET: 2 }
    }
  },
  10: {
    title: 'ワンアーム・プルアップ',
    level1: '1レップスを1セット（片腕ずつ）',
    level2: '3レップスを2セット（片腕ずつ）',
    level3: '6レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 1, SET: 1 },
      level2: { REPS: 3, SET: 2 },
      level3: { REPS: 6, SET: 2 }
    }
  }
}

const leg_raise = {
  1: {
    title: 'ニー・タック',
    level1: '10レップスを1セット',
    level2: '25レップスを2セット',
    level3: '40レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 25, SET: 2 },
      level3: { REPS: 40, SET: 3 }
    }
  },
  2: {
    title: 'フラット・ニー・レイズ',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '35レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 35, SET: 3 }
    }
  },
  3: {
    title: 'フラット・ベント・レッグレイズ',
    level1: '10レップスを1セット',
    level2: '15レップスを2セット',
    level3: '30レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 30, SET: 3 }
    }
  },
  4: {
    title: 'フラット・フロッグ・レイズ',
    level1: '8レップスを1セット',
    level2: '15レップスを2セット',
    level3: '25レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 25, SET: 3 }
    }
  },
  5: {
    title: 'フラット・ストレート・レッグレイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  6: {
    title: 'ハンギング・ニー・レイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  7: {
    title: 'ハンギング・ベント・レッグレイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  8: {
    title: 'ハンギング・フロッグ・レイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  9: {
    title: 'パーシャル・ストレート・レッグレイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  10: {
    title: 'ハンギング・ストレート・レッグレイズ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '30レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 30, SET: 2 }
    }
  }
}


const bridge = {
  1: {
    title: 'ショート・ブリッジ',
    level1: '10レップスを1セット',
    level2: '25レップスを2セット',
    level3: '50レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 25, SET: 2 },
      level3: { REPS: 50, SET: 3 }
    }
  },
  2: {
    title: 'ストレート・ブリッジ',
    level1: '10レップスを1セット',
    level2: '20レップスを2セット',
    level3: '40レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 20, SET: 2 },
      level3: { REPS: 40, SET: 3 }
    }
  },
  3: {
    title: 'アングルド・ブリッジ',
    level1: '8レップスを1セット',
    level2: '15レップスを2セット',
    level3: '30レップスを3セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 30, SET: 3 }
    }
  },
  4: {
    title: 'ヘッド・ブリッジ',
    level1: '8レップスを1セット',
    level2: '15レップスを2セット',
    level3: '25レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 25, SET: 2 }
    }
  },
  5: {
    title: 'ハーフ・ブリッジ',
    level1: '8レップスを1セット',
    level2: '15レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 8, SET: 1 },
      level2: { REPS: 15, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  6: {
    title: 'フル・ブリッジ',
    level1: '6レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 6, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  7: {
    title: 'ウォールウォーキング・ブリッジ（下向き）',
    level1: '3レップスを1セット',
    level2: '6レップスを2セット',
    level3: '10レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 3, SET: 1 },
      level2: { REPS: 6, SET: 2 },
      level3: { REPS: 10, SET: 2 }
    }
  },
  8: {
    title: 'ウォールウォーキング・ブリッジ（上向き）',
    level1: '2レップスを1セット',
    level2: '4レップスを2セット',
    level3: '8レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 2, SET: 1 },
      level2: { REPS: 4, SET: 2 },
      level3: { REPS: 8, SET: 2 }
    }
  },
  9: {
    title: 'クロージング・ブリッジ',
    level1: '1レップスを1セット',
    level2: '3レップスを2セット',
    level3: '6レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 1, SET: 1 },
      level2: { REPS: 3, SET: 2 },
      level3: { REPS: 6, SET: 2 }
    }
  },
  10: {
    title: 'スタンド・トゥ・スタンド・ブリッジ',
    level1: '1レップスを1セット',
    level2: '3レップスを2セット',
    level3: '10～30レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 1, SET: 1 },
      level2: { REPS: 3, SET: 2 },
      level3: { REPS: 10, SET: 2 }
    }
  }
}


const handstand = {
  1: {
    title: 'ウォール・ヘッドスタンド',
    level1: '30秒',
    level2: '1分',
    level3: '2分',
    alt: false,
    placeholder: '秒',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 30, SET: 1 },
      level2: { REPS: 60, SET: 1 },
      level3: { REPS: 120, SET: 1 }
    }
  },
  2: {
    title: 'クロウ・スタンド',
    level1: '10秒',
    level2: '30秒',
    level3: '1分',
    alt: false,
    placeholder: '秒',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 10, SET: 1 },
      level2: { REPS: 30, SET: 1 },
      level3: { REPS: 60, SET: 1 }
    }
  },
  3: {
    title: 'ウォール・ハンドスタンド',
    level1: '30秒',
    level2: '1分',
    level3: '2分',
    alt: false,
    placeholder: '秒',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 30, SET: 1 },
      level2: { REPS: 60, SET: 1 },
      level3: { REPS: 120, SET: 1 }
    }
  },
  4: {
    title: 'ハーフ・ハンドスタンド・プッシュアップ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '20レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 20, SET: 2 }
    }
  },
  5: {
    title: 'ハンドスタンド・プッシュアップ',
    level1: '5レップスを1セット',
    level2: '10レップスを2セット',
    level3: '15レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 10, SET: 2 },
      level3: { REPS: 15, SET: 2 }
    }
  },
  6: {
    title: 'クローズ・ハンドスタンド・プッシュアップ',
    level1: '5レップスを1セット',
    level2: '9レップスを2セット',
    level3: '12レップスを2セット',
    alt: false,
    placeholder: '',
    placeholderAlt: '',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 9, SET: 2 },
      level3: { REPS: 12, SET: 2 }
    }
  },
  7: {
    title: 'アンイーブン・ハンドスタンド・プッシュアップ',
    level1: '5レップスを1セット（片腕ずつ）',
    level2: '8レップスを2セット（片腕ずつ）',
    level3: '10レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 5, SET: 1 },
      level2: { REPS: 8, SET: 2 },
      level3: { REPS: 10, SET: 2 }
    }
  },
  8: {
    title: 'ハーフ・ワンアーム・ハンドスタンド・プッシュアップ',
    level1: '4レップスを1セット（片腕ずつ）',
    level2: '6レップスを2セット（片腕ずつ）',
    level3: '8レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 4, SET: 1 },
      level2: { REPS: 6, SET: 2 },
      level3: { REPS: 8, SET: 2 }
    }
  },
  9: {
    title: 'レバー・ハンドスタンド・プッシュアップ',
    level1: '3レップスを1セット（片腕ずつ）',
    level2: '4レップスを2セット（片腕ずつ）',
    level3: '6レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 3, SET: 1 },
      level2: { REPS: 4, SET: 2 },
      level3: { REPS: 6, SET: 2 }
    }
  },
  10: {
    title: 'ワンアーム・ハンドスタンド・プッシュアップ',
    level1: '1レップスを1セット（片腕ずつ）',
    level2: '2レップスを2セット（片腕ずつ）',
    level3: '5レップスを2セット（片腕ずつ）',
    alt: true,
    placeholder: '右腕',
    placeholderAlt: '左腕',
    goal: {
      level1: { REPS: 1, SET: 1 },
      level2: { REPS: 2, SET: 2 },
      level3: { REPS: 5, SET: 2 }
    }
  }
}

const big6Obj = { pushup, squat, pullup, leg_raise, bridge, handstand };

/**
 * dataが、big6のstepにおいて、何レベルのgoalを達成しているか返す
 * 達成していない場合は1を返す
 * @param {string} big6 
 * @param {number} step 
 * @param {Object} data 
 * @returns {number} クリアしたレベル
 */
const getLevel = (big6, step, data) => {
  const goal = big6Obj[big6][step]['goal'];
  const hasAlt = big6Obj[big6][step]['alt'];

  let level3 = true;
  for (let i = 1; i <= goal['level3']['SET']; i++) {
    level3 = level3 && (data[`set${i}`] >= goal['level3']['REPS']);
  }
  if (hasAlt) {
    for (let i = 1; i <= goal['level3']['SET']; i++) {
      level3 = level3 && (data[`set${i}Alt`] >= goal['level3']['REPS']);
    }
  }
  if (level3) {
    return 3;
  }

  let level2 = true;
  for (let i = 1; i <= goal['level2']['SET']; i++) {
    level2 = level2 && (data[`set${i}`] >= goal['level2']['REPS']);
  }
  if (hasAlt) {
    for (let i = 1; i <= goal['level2']['SET']; i++) {
      level2 = level2 && (data[`set${i}Alt`] >= goal['level2']['REPS']);
    }
  }
  if (level2) {
    return 2;
  }

  return 1;
}

export { big6Obj, getLevel };

/*
function test_getLevel() {
  const testCases = {
    1: { big6: 'pushup', step: 1, data: { set1: 10, set2: 10, set3: 10 }, expected: 1 },
    2: { big6: 'pushup', step: 1, data: { set1: 25, set2: 25, set3: 25 }, expected: 2 },
    3: { big6: 'pushup', step: 1, data: { set1: 50, set2: 50, set3: 50 }, expected: 3 },
    4: { big6: 'pushup', step: 1, data: { set1: 30, set2: 30, set3: 10 }, expected: 2 },
    5: { big6: 'pushup', step: 1, data: { set1: 60, set2: 50, set3: 40 }, expected: 2 },
    6: { big6: 'pushup', step: 1, data: { set1: 9 }, expected: 1 },
    7: { big6: 'pushup', step: 1, data: { set1: 30, set2: 10 }, expected: 1 },
    8: { big6: 'pushup', step: 6, data: { set1: 10, set2: 10, set3: 10 }, expected: 2 },
    9: { big6: 'pushup', step: 6, data: { set1: 20, set2: 19, set3: 15 }, expected: 2 },
   10: { big6: 'pushup', step: 6, data: { set1: 20, set2: 20, set3: 15 }, expected: 3 },
   11: { big6: 'pushup', step: 7, data: { set1: 20, set2: 20, set3: 20 }, expected: 1 },
   12: { big6: 'pushup', step: 7, data: { set1: 5, set1Alt: 5, set2: 5, set2Alt: 5, set3: 5, set3Alt: 5 }, expected: 1 },
   13: { big6: 'pushup', step: 7, data: { set1: 10, set1Alt: 9, set2: 10, set2Alt: 9 }, expected: 1 },
   14: { big6: 'pushup', step: 7, data: { set1: 10, set1Alt: 10, set2: 10, set2Alt: 10, set3: 5, set3Alt: 5 }, expected: 2 },
   15: { big6: 'pushup', step: 7, data: { set1: 20, set1Alt: 20, set2: 20, set2Alt: 19 }, expected: 2 },
   16: { big6: 'pushup', step: 7, data: { set1: 20, set1Alt: 20, set2: 20, set2Alt: 20 }, expected: 3 }
  }

  for (const key of Object.keys(testCases)) {
    const big6 = testCases[key]['big6'];
    const step = testCases[key]['step'];
    const data = testCases[key]['data'];
    const expected = testCases[key]['expected'];
    const actual = getLevel(big6, step, data);
    

    console.assert(expected === actual, `【${key}】getClearLevel: actual=${actual}, expected=${expected}`);
  }
}

console.log('test_getLevel()')
const startTime = performance.now();
test_getLevel();
const endTime = performance.now();
console.log(`...実行時間：${endTime - startTime}`);
*/