import * as React from 'react';
import styles from './index.module.css';
import {
	widget,
	version,
	ChartingLibraryWidgetOptions,
	LanguageCode,
	IChartingLibraryWidget,
	ResolutionString,
} from '../../../public/static/charting_library';

export interface ChartContainerProps {
	symbol: ChartingLibraryWidgetOptions['symbol'];
	interval: ChartingLibraryWidgetOptions['interval'];

	// BEWARE: no trailing slash is expected in feed URL
	datafeedUrl: string;
	libraryPath: ChartingLibraryWidgetOptions['library_path'];
	chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
	chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
	clientId: ChartingLibraryWidgetOptions['client_id'];
	userId: ChartingLibraryWidgetOptions['user_id'];
	fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
	autosize: ChartingLibraryWidgetOptions['autosize'];
	studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
	container: ChartingLibraryWidgetOptions['container'];
}

export interface ChartContainerState {
}

function getLanguageFromURL(): LanguageCode | null {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
}


export class TVChartContainer extends React.PureComponent {
	static defaultProps: Omit<ChartContainerProps, 'container'> = {
		symbol: 'AAPL',
		interval: 'D' as ResolutionString,
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/static/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	private tvWidget: IChartingLibraryWidget | null = null;
	private ref: React.RefObject<HTMLDivElement>
	
	constructor(props: any) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			theme:'dark',
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			interval: this.props.interval,
			container: this.ref.current,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				'mainSeriesProperties.showCountdown': false,
				'paneProperties.background': '#202b33',
				'mainSeriesProperties.candleStyle.upColor': '#4aa529',
				'mainSeriesProperties.candleStyle.downColor': '#db3737',
				// "mainSeriesProperties.candleStyle.borderColor": color,
				'mainSeriesProperties.candleStyle.borderUpColor': '#4aa529',
				'mainSeriesProperties.candleStyle.borderDownColor': '#db3737',
				'mainSeriesProperties.candleStyle.wickUpColor': '#4aa529',
				'mainSeriesProperties.candleStyle.wickDownColor': '#db3737',
			  },
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
			return [{price: 170, size:'10'}, {price: 175, size:'10'}, {price: 180,size:'10' }].map((order) => {
			tvWidget
			.activeChart()
			.createOrderLine()
			.setPrice(order.price)
			.setLineColor('#db3737')
			.setBodyBorderColor('#db3737')
			.setQuantityBackgroundColor('#db3737')
			.setCancelButtonIconColor('#db3737')
			.setBodyTextColor('#db3737')
			.setQuantityBorderColor('#db3737')
			.setCancelButtonBorderColor('#db3737')
			.setTooltip('Additional order information')
			.setModifyTooltip('Modify order')
			.setCancelTooltip('Cancel order')
			.onMove(function () {
			  this.setText('onMove called');
			//   PrimaryToast('Order Amended', `Set to: ${this.getPrice()}`);
			})
			.onModify('onModify called', function (text) {
			  this.setText(text);
			})
			.onCancel('onCancel called', function (text) {
			  this.setText(text);
			})
			.setText('STOP: 73.5 (5,64%)')
			.setQuantity(order.size);
		});
	});
	}

		componentWillUpdate() {
			// console.log('tv chart comp will update', this.props.orders);
			this.tvWidget.onChartReady(() => {
			   return [{price: 120, size:'10'}, {price: 140, size:'10'}, {price: 180,size:'10' }].map((order) => {
				 this.tvWidget
				  .activeChart()
				  .createOrderLine()
				  .setPrice(order.price)
				  .setLineColor('#db3737')
				  .setBodyBorderColor('#db3737')
				  .setQuantityBackgroundColor('#db3737')
				  .setCancelButtonIconColor('#db3737')
				  .setBodyTextColor('#db3737')
				  .setQuantityBorderColor('#db3737')
				  .setCancelButtonBorderColor('#db3737')
				  .setTooltip('Additional order information')
				  .setModifyTooltip('Modify order')
				  .setCancelTooltip('Cancel order')
				  .onMove(function () {
					this.setText('onMove called');
					// PrimaryToast('Order Amended', `Set to: ${this.getPrice()}`);
				  })
				  .onModify('onModify called', function (text) {
					this.setText(text);
				  })
				  .onCancel('onCancel called', function (text) {
					this.setText(text);
				  })
				  .setText('STOP: 73.5 (5,64%)')
				  .setQuantity(order.size);
			  });
		
		  })

		}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (	
			<>		
				<div ref={this.ref} className={styles.TVChartContainer} />
			</>
		);
	}
}