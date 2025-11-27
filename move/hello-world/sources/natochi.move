module hello_world::natochi;

use sui::coin::{Self, Coin};
use sui::coin_registry;

// use sui::object;
// use sui::tx_context;

// 1. Define your coin type
public struct NATOCHI has drop {}

// 2. Store total supply information
public struct TotalSupply has key, store {
    id: UID,
    max_supply: u64,
    current_supply: u64,
}

// 3. Transfer pause control
public struct TransferPause has key, store {
    id: UID,
    paused: bool,
}

// 4. Error codes
const EMaxSupplyExceeded: u64 = 0;
const ETransfersPaused: u64 = 1;
const ENotEnoughBalance: u64 = 2;

// ===== INITIALIZATION =====
fun init(widness: NATOCHI, ctx: &mut TxContext) {
    // Create currency with metadata
    let (builder, treasury_cap) = coin_registry::new_currency_with_otw(
        widness,
        9,
        b"NATOCHI".to_string(),
        b"Natochi Token".to_string(),
        b"NATOCHI".to_string(),
        b"".to_string(),
        ctx,
    );

    // Create and store total supply tracker
    let total_supply = TotalSupply {
        id: object::new(ctx),
        max_supply: 1000000000000000, // 1 million tokens with 9 decimals
        current_supply: 0,
    };

    // Create transfer pause controller
    let transfer_pause = TransferPause {
        id: object::new(ctx),
        paused: false, // Initially not paused
    };

    //  let metadata = coin::create_currency_metadata(
    //     9,
    //     b"NATOCHI",
    //     b"Natochi Token",
    //     b"NATOCHI",
    //     b"",
    //     ctx
    // );

    // Transfer ownership to module publisher
    // let sender = tx_context::sender(ctx);
    let metadata_cap = builder.finalize(ctx);
    let sender = ctx.sender();
    transfer::public_transfer(treasury_cap, sender);
    transfer::public_transfer(metadata_cap, sender);
    transfer::public_transfer(total_supply, sender);
    transfer::public_transfer(transfer_pause, sender);
}

// #[allow(deprecated_usage)]
// // [allow(deprecated_usage)]

// fun init(widness: NATOCHI, ctx: &mut TxContext) {
//     // Use standard Sui coin::create_currency instead of coin_registry

//     let (treasury_cap, metadata) = coin::create_currency(
//         widness,
//         9,
//         b"NATOCHI",
//         b"Natochi Token",
//         b"NATOCHI",
//         b"hjj",
//         ctx,
//     );

//     // Create your custom objects
//     let total_supply = TotalSupply {
//         id: object::new(ctx),
//         max_supply: 1000000000000000,
//         current_supply: 0,
//     };

//     let transfer_pause = TransferPause {
//         id: object::new(ctx),
//         paused: false,
//     };

//     let sender = ctx.sender();

//     // Transfer ALL objects
//     transfer::public_transfer(treasury_cap, sender);
//     transfer::public_transfer(metadata, sender); // This transfers the actual CoinMetadata
//     transfer::public_transfer(total_supply, sender);
//     transfer::public_transfer(transfer_pause, sender);
// }

// ===== MINTING FUNCTIONS =====

/// Mint new tokens with max supply enforcement
public fun mint(
    treasury_cap: &mut coin::TreasuryCap<NATOCHI>,
    total_supply: &mut TotalSupply,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    // Check if minting would exceed max supply
    assert!(total_supply.current_supply + amount <= total_supply.max_supply, EMaxSupplyExceeded);

    // Mint the coins
    let minted_coins = coin::mint(treasury_cap, amount, ctx);

    // Update supply tracker
    total_supply.current_supply = total_supply.current_supply + amount;

    // Transfer to recipient
    transfer::public_transfer(minted_coins, recipient);
}

/// Mint and keep coins in caller's account
public fun mint_to_self(
    treasury_cap: &mut coin::TreasuryCap<NATOCHI>,
    total_supply: &mut TotalSupply,
    amount: u64,
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);
    mint(treasury_cap, total_supply, amount, sender, ctx);
}

// ===== BURNING FUNCTIONS =====

/// Burn tokens and update total supply (authorized burn)
public fun burn(
    treasury_cap: &mut coin::TreasuryCap<NATOCHI>,
    total_supply: &mut TotalSupply,
    coin_to_burn: Coin<NATOCHI>,
) {
    let amount = coin::value(&coin_to_burn);

    // Check if we have enough supply to burn
    assert!(total_supply.current_supply >= amount, ENotEnoughBalance);

    // Burn the coins
    coin::burn(treasury_cap, coin_to_burn);

    // Update supply tracker
    total_supply.current_supply = total_supply.current_supply - amount;
}

// /// Let anyone burn their own tokens (doesn't affect total supply tracking)
// public entry fun burn_anyones_tokens(coins: Coin<NATOCHI>) {
//     let balance = coin::into_balance(coins);
//     balance::destroy(balance);
// }

// Let users "burn" by sending to burn address =====
public fun send_to_burn_address(coins: Coin<NATOCHI>, burn_address: address) {
    // This doesn't actually reduce supply but makes tokens inaccessible
    transfer::public_transfer(coins, burn_address);
}

// ===== TRANSFER CONTROL FUNCTIONS =====

/// Pause all transfers of this token
public fun pause_transfers(transfer_pause: &mut TransferPause) {
    transfer_pause.paused = true;
}

/// Unpause transfers of this token
public entry fun unpause_transfers(transfer_pause: &mut TransferPause) {
    transfer_pause.paused = false;
}

/// Safe transfer function that checks pause state
public entry fun safe_transfer(
    transfer_pause: &TransferPause,
    coins: Coin<NATOCHI>,
    recipient: address,
) {
    assert!(!transfer_pause.paused, ETransfersPaused);
    transfer::public_transfer(coins, recipient);
}

/// Split coins with pause check
public fun safe_split(
    transfer_pause: &TransferPause,
    coin: &mut Coin<NATOCHI>,
    amount: u64,
    ctx: &mut TxContext,
): Coin<NATOCHI> {
    assert!(!transfer_pause.paused, ETransfersPaused);
    coin::split(coin, amount, ctx)
}

// ===== AUTHORITY MANAGEMENT =====

/// Transfer minting authority to another account
public fun transfer_minting_authority(
    treasury_cap: coin::TreasuryCap<NATOCHI>,
    new_owner: address,
) {
    transfer::public_transfer(treasury_cap, new_owner);
}

/// Transfer total supply tracker to another account
public fun transfer_supply_tracker(total_supply: TotalSupply, new_owner: address) {
    transfer::public_transfer(total_supply, new_owner);
}

/// Transfer pause controller to another account
public fun transfer_pause_controller(transfer_pause: TransferPause, new_owner: address) {
    transfer::public_transfer(transfer_pause, new_owner);
}

// ===== VIEW FUNCTIONS =====

/// Get current supply information
public fun get_supply_info(total_supply: &TotalSupply): (u64, u64) {
    (total_supply.current_supply, total_supply.max_supply)
}

/// Check if transfers are paused
public fun is_transfers_paused(transfer_pause: &TransferPause): bool {
    transfer_pause.paused
}

/// Get remaining mintable amount
public fun get_remaining_supply(total_supply: &TotalSupply): u64 {
    total_supply.max_supply - total_supply.current_supply
}

// ===== ADMIN FUNCTIONS =====

/// Update max supply (only useful before reaching current max)
public fun update_max_supply(total_supply: &mut TotalSupply, new_max_supply: u64) {
    // Ensure new max is not less than current supply
    assert!(new_max_supply >= total_supply.current_supply, EMaxSupplyExceeded);
    total_supply.max_supply = new_max_supply;
}
