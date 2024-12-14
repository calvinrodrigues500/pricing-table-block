/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {

  const { borderRadius, pricingCards, gap } = attributes;

  const cards = pricingCards.map((card, index) => (
    <div
      className='pricing-block-flex-item'
      style={{ borderRadius }
    }>
      <RichText.Content
        tagName='h3'
        value={card.title}
      />
      <RichText.Content
        tagName='p'
        value={card.content}
      />        
    </div>
  ));

  return (
    <div
      {...useBlockProps.save({ attributes })}
      className='pricing-block-flex'
      style={{ gap }}
    >
      {cards}
    </div>
  );
}
