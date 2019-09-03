//Return lineNumber, levelType, description, parentLineNumber for each order according to the provided hierarchy. (eg S,O,P, or S,T,O,I,P)

const example1 = [
  '1:S:Walmart Distribution Center #100',
  '2:O:ORD1230', //parent line 1
  '3:P:Honey Dishwasher Soap 1L,200 pieces', //parent line 2
  '4:P:Blueberry Dishwasher Soap 1L,100 pieces', //parent line 2
  '5:O:ORD4590', //parent line 1
  '6:P:Honey Dishwasher Soap 1L,120 pieces', //parent line 5
  '7:S:Walmart Distribution Center #200',
  '8:O:ORD3405', //parent line 7
  '9:P:Honey Dishwasher Soap 1L,150 pieces', //parent line 8
  '10:P:Blueberry Dishwasher Soap 1L,210 pieces' //parent line 8
]
const example2 = [
  '1:S:Walmart Distribution Center #100',
  '2:T:FEDEX TRUCK #120370',
  '3:O:ORD1230',
  '4:I:Honey Dishwasher Soap 1L',
  '5:P:20000 pieces',
  '6:P:15000 pieces',
  '7:S:Walmart Distribution Center #200',
  '8:T:FEDEX TRUCK #23403',
  '9:O:ORD2435',
  '10:I:Blueberry Dishwasher Soap 1L',
  '11:P:10000 pieces',
  '12:P:20000 pieces'
]

class ShipmentInfoLine {
  constructor(lineNumber, levelType, description, parentLineNumber) {
    this.lineNumber = lineNumber
    this.levelType = levelType
    this.description = description
    this.parentLineNumber = parentLineNumber
  }
}

/**
 * lines: Array<string>
 * @return: Array<ShipmentInfoLine>
 */

function defineHierarchy(lines) {
  const hierarchy = []
  const splitLines = lines.map(item => item.split(':'))
  splitLines.forEach(array => {
    if (!hierarchy.includes(array[1])) {
      hierarchy.push(array[1])
    }
  })
  return hierarchy
}

function returnOrdersArrayOfObjects(lines) {
  const splitLines = lines.map(item => item.split(':'))
  let ordersObject = []
  splitLines.forEach(item =>
    ordersObject.push({
      lineNumber: Number(item[0]),
      hierarchy: item[1],
      description: item[2],
      parentLine: null
    })
  )
  return ordersObject
}

function parse(lines) {
  const hierarchy = defineHierarchy(lines)
  let orders = returnOrdersArrayOfObjects(lines)
  const reversedOrders = [...orders].reverse()
  reversedOrders.forEach((order, index) => {
    if (order.hierarchy != hierarchy[0]) {
      let currIndex = hierarchy.indexOf(order.hierarchy)
      let lookingForIndex = null
      if (hierarchy.indexOf(order.hierarchy) > 0) {
        lookingForIndex = currIndex - 1
      }
      for (let i = order.lineNumber - 1; i >= 0; i--) {
        if (orders[i].hierarchy == hierarchy[lookingForIndex]) {
          order.parentLine = orders[i].lineNumber
          break
        }
      }
    }
  })
  console.log('orders', orders)
  return orders
}

parse(example1)
//parse(example2);
