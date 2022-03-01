import type { MockMethod } from 'vite-plugin-mock'

// import Mock, { MockjsMock, MockjsToJSONSchema } from 'mockjs'

// // [定义数据类型](http://mockjs.com/examples.html)
// const template = {
// 	// 20条数据
// 	"data|20": [{
// 		// 商品种类
// 		"goodsClass": "女装",
// 		// 商品Id
// 		"goodsId|+1": 1,
// 		//商品名称
// 		"goodsName": "@ctitle(10)",
// 		//商品地址
// 		"goodsAddress": "@county(true)",
// 		//商品等级评价★
// 		"goodsStar|1-5": "★",
// 		//商品图片
// 		"goodsImg": "@Image('100x100','@color','小甜甜')",
// 		//商品售价
// 		"goodsSale|30-500": 30

// 	}]
// }
// var data: MockjsMock = Mock.mock(template)

// console.dir(Mock.toJSONSchema(template).properties[0]);

// const templates = {
//     'age|10-40': 1,
// };

const data = {
    age: 60,
};

// console.log(Mock.valid(templates, datas));

export default [
	{
		url: '/api/get',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: data
			}
		}
	},
	{
		url: '/api/post',
		method: 'post',
		timeout: 2000,
		response: {
			code: 0,
			data: {
				name: 'vue3'
			}
		}
	},
	{
		url: '/api/text',
		method: 'post',
		rawResponse: async (req, res) => {
			let reqbody = ''
			await new Promise(resolve => {
				req.on('data', chunk => {
					reqbody += chunk
				})
				req.on('end', () => resolve(undefined))
			})
			res.setHeader('Content-Type', 'text/plain')
			res.statusCode = 200
			res.end(`hello, ${reqbody}`)
		}
	}
] as MockMethod[]
