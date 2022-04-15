class Ui {
  constructor () {
    this.budgetForm = document.querySelector('.form')
    this.budgetInput = document.querySelector('.budget')
    this.twoForm = document.querySelector('#realTow')
    this.expenseInput = document.querySelector('.expen-input')
    this.amountInput = document.querySelector('.amount-input')
    this.expense = document.querySelector('.expence-amount')
    this.amount = document.querySelector('.balanback')
    this.budget = document.querySelector('.budget-amount')
    this.newElFeedback = document.querySelector('.second-con')
    this.valueFeedback = document.querySelector('.balance-amount')
    this.feedBack = document.querySelector('.masage')
    this.feedBack2 = document.querySelector('.masage2')
    this.itemList = []
    this.itemId = 0
  }

  // submit budget form
  submitBudgetForm () {
    const value = this.budgetInput.value
    if (value === '' || value < 0 || isNaN(value)) {
      this.feedBack.classList.add('show-msg')
      this.feedBack.innerHTML = '<p>field can\'t be empty / text or contains negative value</p>'
      const self = this
      setTimeout(() => {
        self.feedBack.classList.remove('show-msg')
      }, 3000)
    } else {
      this.budget.textContent = value
      this.budgetInput.value = ''
      this.showBalance()
    }
  }

  // create balence object
  showBalance () {
    const expence = this.totalExpence()
    const total = parseInt(this.budget.textContent) - expence
    this.valueFeedback.textContent = total
    if (total < 0) {
      this.valueFeedback.classList.add('red')
    } else if (total > 0) {
      this.valueFeedback.classList.add('green')
    } else {
      this.valueFeedback.classList.add('black')
    }
  }

  // submit expenses for form
  submitExpenseForm () {
    const expenseValue = this.expenseInput.value
    const amountValue = this.amountInput.value
    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.feedBack2.classList.add('show-msg2')
      this.feedBack2.innerHTML = '<p>field can\'t be empty or negative value</p>'
      const self = this
      setTimeout(() => {
        self.feedBack2.classList.remove('show-msg2')
      }, 3000)
    } else {
      const amount = parseInt(amountValue)
      this.expenseInput.value = ''
      this.amountInput.value = ''

      const expenses = {
        id: this.itemId,
        title: expenseValue,
        amount: amount
      }
      this.itemId++
      this.itemList.push(expenses)
      this.addExpense(expenses)
      // show balence
      this.showBalance()
    }
  }

  // add expence
  addExpense (expenses) {
    const newEl = document.createElement('div')
    newEl.classList.add('other-second')
    newEl.innerHTML = `
    <div class="ex-tit">${expenses.title}</div>
    <div class="ex-val">${expenses.amount}</div>
    <div class="con-icon">
        <a href="#" class="edit-icon" data-id="${expenses.id}">
       <i class="fas fa-edit green"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expenses.id}">
       <i class="far fa-trash-alt red"></i>
        </a>
    </div>`

    this.newElFeedback.appendChild(newEl)
  }

  totalExpence () {
    let total = 0
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        acc += curr.amount
        return acc
      }, 0)
    }
    this.expense.textContent = total
    return total
  }

  // edit icon
  editIcon (element) {
    const id = parseInt(element.dataset.id)
    const parent = element.parentElement.parentElement
    // remove from dom
    this.newElFeedback.removeChild(parent)
    //  remove from list
    const expence = this.itemList.filter((item) => {
      return item.id === id
    })
    // show value
    this.expenseInput.value = expence[0].title
    this.amountInput.value = expence[0].amount
    // remove from list
    const listItem = this.itemList.filter((item) => {
      return item.id !== id
    })
    this.itemList = listItem
    this.showBalance()
  }

  // delete icon
  deleteIcon (element) {
    const id = parseInt(element.dataset.id)
  const parent = element.parentElement.parentElement
// remove from dom
  this.newElFeedback.removeChild(parent)
//  remove from list
  const expence = this.itemList.filter((item) => {
  return item.id === id
})
// show value
this.expenseInput.value = expence[0].title
this.amountInput.value = expence[0].amount
// remove from list
const listItem = this.itemList.filter((item) => {
  return item.id !== id
})
this.itemList = listItem
this.showBalance()
  }
}
function domLoaded () {
  const budgetForm = document.querySelector('.form')
  const twoForm = document.querySelector('#realTow')
  const expenseFeedBack = document.querySelector('.second-con')
  // new instance of our construtor function
  const ui = new Ui()
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault()
    ui.submitBudgetForm()
  })
  twoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    ui.submitExpenseForm()
  })

  expenseFeedBack.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('edit-icon')) {
      ui.editIcon(e.target.parentElement)
    } else if (e.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteIcon(e.target.parentElement)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  domLoaded()
})
