import {h, app} from "hyperapp"
import steem from "steem"
import Main from "./components/Main"
import FlexColumn from "./components/FlexColumn"
import H1 from "./components/H1"
import Input from "./components/Input"
import './reset.css'
require('babel-polyfill')

const state = {
  error: '',
  user: '',
  reputation: ''
}

const formatReputation = (reputation, digits = 3) => {
  const isNegative = (reputation < 0)
  let formattedReputation = Math.log10(Math.abs(reputation))
  formattedReputation = Math.max(formattedReputation - 9, 0)
  formattedReputation *= isNegative ? -9 : 9
  formattedReputation += 25
  return formattedReputation.toFixed(digits)
}

const actions = {
  getAccount: () => async (state, actions) => {
    try {
      const [account] = await steem.api.getAccountsAsync([state.user])
      if (!account) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.')}
      actions.reputation(account.reputation)
    } catch (error) {
      actions.error(error.message)
    }
  },
  error: message => state => ({ error: message }),
  reputation: value => state => ({ reputation: formatReputation(value, 5)}),
  updateUser: ({ user }) => state => {
    return { user: user, error: '', reputation: '' }
  },
  submitUser: () => (state, actions) => {
    actions.getAccount()
  }
}

const view = (state, actions) => (
  <Main>
    <FlexColumn>
      <H1>Steemit Reputation</H1>
      <Input
        onkeyup={
          event => {
            event.keyCode === 13 ?
              actions.submitUser() :
              actions.updateUser({ user: event.target.value })
          }
        }
        placeholder='username …'
        autofocus
      />
      <p>{state.error}</p>
      <H1 style={{marginTop: '1em'}}>{state.reputation}</H1>
    </FlexColumn>
  </Main>
)

const main = app(state, actions, view, document.body)
