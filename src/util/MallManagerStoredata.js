// 加密方式
const encryptionList = [
  {
    label: 'rc4-md5',
    value: 'rc4-md5'
  },
  {
    label: 'aes-128-ctr',
    value: 'aes-128-ctr'
  },
  {
    label: 'aes-192-ctr',
    value: 'aes-192-ctr'
  },
  {
    label: 'aes-256-ctr',
    value: 'aes-256-ctr'
  },
  {
    label: 'aes-128-cfb',
    value: 'aes-128-cfb'
  },
  {
    label: 'aes-192-cfb',
    value: 'aes-192-cfb'
  },
  {
    label: 'aes-256-cfb',
    value: 'aes-256-cfb'
  },
  {
    label: 'chacha20',
    value: 'chacha20'
  },
  {
    label: 'rc4',
    value: 'rc4'
  }
]

// 代理方式
const ipTypeList = [
  {
    value: '',
    label: '无'
  },
  {
    value: 'SSR',
    label: 'SSR'
  },
  {
    value: 'HTTP',
    label: 'HTTP'
  }
]

// 协议
const protocolList = [
  {
    label: 'auth_sha1_v4',
    value: 'auth_sha1_v4'
  },
  {
    label: 'auth_aes128_md5',
    value: 'auth_aes128_md5'
  },
  {
    label: 'auth_aes128_sha1',
    value: 'auth_aes128_sha1'
  },
  {
    label: 'auth_chain_a',
    value: 'auth_chain_a'
  },
  {
    label: 'auth_chain_b',
    value: 'auth_chain_b'
  },
  {
    label: 'auth_chain_c',
    value: 'auth_chain_c'
  },
  {
    label: 'auth_chain_d',
    value: 'auth_chain_d'
  }
]
// 混淆
const confuseList = [
  {
    label: 'http_simple',
    value: 'http_simple'
  },
  {
    label: 'http_post',
    value: 'http_post'
  },
  {
    label: 'random_head',
    value: 'random_head'
  },
  {
    label: 'tls1.2_ticket_auth',
    value: 'tls1.2_ticket_auth'
  },
  {
    label: 'tls1.2_ticket_fastauth',
    value: 'tls1.2_ticket_fastauth'
  }
]

export { encryptionList, ipTypeList, protocolList, confuseList }
