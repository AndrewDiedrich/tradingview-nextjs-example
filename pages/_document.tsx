import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return {
		  ...initialProps,
		  styles: [<>{initialProps.styles}</>]
		};
	  }
	render() {
		return (
			<Html>
				<Head>
				{CssBaseline.flush()}
				<script src="/static/datafeeds/udf/dist/bundle.js" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}


}